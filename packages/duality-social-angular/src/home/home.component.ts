import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, SilentRequest } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginDisplay = false;

  constructor(private authService: MsalService, private msalBroadcastService: MsalBroadcastService) { }

  public async test() {
    const accountInfo = this.authService.instance.getActiveAccount();
    if (!accountInfo) {
      return;
    }
    // make a call to the API to test
    const request: SilentRequest = {
      scopes: ['User.Read','openid','profile','api://8c8572d9-9cad-4cee-b00f-4b642f7441bb/access_as_user'],
      account: accountInfo,
    };
    await this.authService.instance.acquireTokenSilent(request).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        console.log(result);
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      })

  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

}
