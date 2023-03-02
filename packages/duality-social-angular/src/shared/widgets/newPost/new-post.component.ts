import { Component, OnInit } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { LayoutComponent } from "../../../shared/layout/layout.component";
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-new-post',
    templateUrl: './new-post.component.html',
    styleUrls: ['./new-post.component.css']
  })
export class NewPostComponent implements OnInit {
  /**
   * Whether to show the new post input box.
   */
  public form!: UntypedFormGroup;
  public get signedIn(): boolean {
    return this.layoutComponent.authService.instance.getAllAccounts().length > 0;
  }
  constructor(private route: ActivatedRoute, public layoutComponent: LayoutComponent, private httpClient: HttpClient) {
    
  }

  public async submit(): Promise<void> {
    if (this.form.valid) {
        this.httpClient.post('https://localhost:3000/api/openai/devils-advocate', {
          postContent: this.form.get('postContent')?.value
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).subscribe((res) => {
          console.log(res);
          this.form.reset();
        });
    }
  }

  public hideNewPost(): void {
    this.layoutComponent.hideNewPost();
  }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      if (params['newPost'] === 'true') {
        this.layoutComponent.showNewPost();
      }
    }
  );
    this.form = new UntypedFormGroup({
        postContent: new UntypedFormControl('', Validators.required),
      });
  }
}