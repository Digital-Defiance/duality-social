import { Component, Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-fa-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
})
export class PlaygroundComponent implements OnInit, OnChanges {

  public get PlaygroundOutput(): SafeHtml {
    return this._playgroundOutput;
  }
  public set PlaygroundOutput(value: SafeHtml) {
    this._playgroundOutput = value;
  }
  private _playgroundOutput: SafeHtml = "" as SafeHtml;

  /**
   * Whether to show the new post input box.
   */
  public form!: UntypedFormGroup;
  private _postContent = '';
  public get postContent(): string {
    return this._postContent;
  }
  public set postContent(value: string) {
    this._postContent = value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updatePostContent();
  }

  public updatePostContent(): void {
    this._postContent = this.form.get('postContent')?.value;
  }

  public ngOnInit(): void {
    this.form = new UntypedFormGroup({
      postContent: new UntypedFormControl('', Validators.required),
    });
  }
}
