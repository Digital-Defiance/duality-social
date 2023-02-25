import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';
// import { AuthGuard } from '../../core/guards/auth.guard';
import { MsalGuard, MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { SpinnerService } from '../../core/services/spinner.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {

    private _mobileQueryListener: () => void;
    mobileQuery: MediaQueryList;
    showSpinner = false;
    userName = "";
    isAdmin = false;

    private autoLogoutSubscription: Subscription = new Subscription;

    constructor(private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        public spinnerService: SpinnerService,
        private authService: MsalService,
        private authGuard: MsalGuard,
        private router: Router) {
        this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        // tslint:disable-next-line: deprecation
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit(): void {
        const user: AccountInfo = this.authService.instance.getAllAccounts()[0];

        this.isAdmin = false;
        this.userName = user.name ?? user.username ?? user.localAccountId ?? user.homeAccountId ?? "Unknown User";

        // Auto log-out subscription
        const timer$ = timer(2000, 5000);
        this.autoLogoutSubscription = timer$.subscribe(() => {
            const stateObj: RouterState = this.router.routerState;
            const snapshot: RouterStateSnapshot = stateObj.snapshot;
            this.authGuard.canActivate(snapshot.root, snapshot);
        });
    }

    ngOnDestroy(): void {
        // tslint:disable-next-line: deprecation
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.autoLogoutSubscription.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.changeDetectorRef.detectChanges();
    }
}
