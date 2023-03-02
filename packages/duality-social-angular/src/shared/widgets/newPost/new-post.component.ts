import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { LayoutComponent } from "../../../shared/layout/layout.component";
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-new-post',
    templateUrl: './new-post.component.html',
    styleUrls: ['./new-post.component.css']
  })
export class NewPostComponent implements OnInit, OnChanges {
  /**
   * Whether to show the new post input box.
   */
  public form!: UntypedFormGroup;
  
  private _postContent = '';
  @Input()
  public get postContent(): string {
    return this._postContent;
  }
  public set postContent(value: string) {
    this._postContent = value;
  }

  public get signedIn(): boolean {
    return this.layoutComponent.authService.instance.getAllAccounts().length > 0;
  }
  constructor(private route: ActivatedRoute, public layoutComponent: LayoutComponent, private httpClient: HttpClient) {
    
  }

  public updatePostContent(): void {
    this._postContent = this.form.get('postContent')?.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updatePostContent();
  }

  public async submit(): Promise<void> {
    if (this.form.valid) {
        this.httpClient.post('/api/openai/devils-advocate', {
          postContent: this._postContent
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