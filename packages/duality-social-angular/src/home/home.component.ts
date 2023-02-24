import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, SilentRequest } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import { IDevilsAdvocateRequest, IDevilsAdvocateResponse } from '@digital-defiance/duality-social-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginDisplay = false;

  constructor(private authService: MsalService, private msalBroadcastService: MsalBroadcastService, private http: HttpClient) { }

  public async test() {
    const accountInfo = this.authService.instance.getActiveAccount();
    if (!accountInfo) {
      return;
    }

    const aiRequest: IDevilsAdvocateRequest = {
      postText: 'I love chocolate, and screw anyone who says otherwise.',
      postId: '1234',
      userId: accountInfo.nativeAccountId ?? '1234',
      images: []
    };
    this.http.post<IDevilsAdvocateResponse>('/api/openai/devils-advocate', aiRequest, {
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'json'
    })
      .subscribe(( result: IDevilsAdvocateResponse ) => {
        console.log({
          request: aiRequest,
          response: result});
      });


    // make a call to the API to test
    const request: SilentRequest = {
      scopes: ['User.Read','openid','profile'],
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
