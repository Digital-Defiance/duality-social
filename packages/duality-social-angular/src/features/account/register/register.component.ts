import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private token!: string;
  public email = '';
  public username = '';
  public form!: UntypedFormGroup;
  public loading!: boolean;
  public hideNewPassword: boolean;
  public hideNewPasswordConfirm: boolean;

  constructor(private activeRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private titleService: Title) {

    this.titleService.setTitle('Duality Social - Register');
    this.hideNewPassword = true;
    this.hideNewPasswordConfirm = true;
  }

  ngOnInit() {
    this.form = new UntypedFormGroup({
      newPassword: new UntypedFormControl('', Validators.required),
      newPasswordConfirm: new UntypedFormControl('', Validators.required)
    });
  }

  register() {
    const email = this.form.get('email')?.value;
    if (!email) {
      this.notificationService.openSnackBar('Email is required');
      return;
    }
    const username = this.form.get('username')?.value;
    if (!username) {
      this.notificationService.openSnackBar('Username is required');
      return;
    }
    const password = this.form.get('newPassword')?.value;
    if (!password || password.length < 8) {
      this.notificationService.openSnackBar('Password is required');
      return;
    }
    const passwordConfirm = this.form.get('newPasswordConfirm')?.value;

    if (password !== passwordConfirm) {
      this.notificationService.openSnackBar('Passwords do not match');
      return;
    }

    this.loading = true;

    
    // this.authService.passwordReset(this.email, this.token, password, passwordConfirm)
    //   .subscribe(
    //     () => {
    //       this.notificationService.openSnackBar('Your password has been changed.');
    //       this.router.navigate(['/auth/login']);
    //     },
    //     (error: any) => {
    //       this.notificationService.openSnackBar(error.error);
    //       this.loading = false;
    //     }
    //   );
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
