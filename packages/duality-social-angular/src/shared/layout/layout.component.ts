import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  AfterViewInit,
  Inject,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { filter, Subject, takeUntil, timer } from 'rxjs';
import { Subscription } from 'rxjs';
// import { AuthGuard } from '../../core/guards/auth.guard';
import {
  MsalBroadcastService,
  MsalGuard,
  MsalGuardConfiguration,
  MsalService,
  MSAL_GUARD_CONFIG,
} from '@azure/msal-angular';
import {
  AccountInfo,
  AuthenticationResult,
  EventMessage,
  EventType,
  InteractionStatus,
  PopupRequest,
  RedirectRequest,
} from '@azure/msal-browser';
import { Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { SpinnerService } from '../../core/services/spinner.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  private _mobileQueryListener: () => void;
  public mobileQuery: MediaQueryList;
  public showSpinner = false;
  public userName = 'Log In';
  public isAdmin = false;
  public userLoggedInDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  private autoLogoutSubscription: Subscription = new Subscription();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    public spinnerService: SpinnerService,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private authGuard: MsalGuard,
    private router: Router
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  loginRedirect() {
    if (this.msalGuardConfig.authRequest){
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  loginPopup() {
    if (this.msalGuardConfig.authRequest){
      this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
        });
      } else {
        this.authService.loginPopup()
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
      });
    }
  }

  logout(popup?: boolean) {
    if (popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: '/',
      });
    } else {
      this.authService.logoutRedirect();
    }
  }

  ngOnInit(): void {
    this.isAdmin = false;
    const user: AccountInfo = this.authService.instance.getAllAccounts()[0];
    if (user === undefined) {
        this.userLoggedInDisplay = false;
        this.userName = '';
    } else {
        this.userName =
        user.name ??
        user.username ??
        user.localAccountId ??
        user.homeAccountId ??
        'Unknown User';
    }

    // Auto log-out subscription
    const timer$ = timer(2000, 5000);
    this.autoLogoutSubscription = timer$.subscribe(() => {
      const stateObj: RouterState = this.router.routerState;
      const snapshot: RouterStateSnapshot = stateObj.snapshot;
      this.authGuard.canActivate(snapshot.root, snapshot);
    });
    this.setLoginDisplay();

    this.authService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window

    const addedOrRemoved: (msg: EventMessage) => boolean = (
      msg: EventMessage
    ) =>
      msg.eventType === EventType.ACCOUNT_ADDED ||
      msg.eventType === EventType.ACCOUNT_REMOVED;
    this.msalBroadcastService.msalSubject$
      .pipe(filter(addedOrRemoved))
      .subscribe((result) => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/';
        } else {
          this.setLoginDisplay();
        }
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });
  }

  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    const activeAccount = this.authService.instance.getActiveAccount();

    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      const accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  setLoginDisplay() {
    this.userLoggedInDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.autoLogoutSubscription.unsubscribe();
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}
