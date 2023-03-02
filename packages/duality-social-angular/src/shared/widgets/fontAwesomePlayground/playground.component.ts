import { Component, Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { parsePostContent } from '@digital-defiance/duality-social-lib';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

@Component({
  selector: 'app-fa-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [SafeHtmlPipe]
})
export class PlaygroundComponent implements OnInit, OnChanges {
  constructor(private _safeHtmlPipe: SafeHtmlPipe) {}

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
  private _postContent:SafeHtml = '';
  public get postContent(): SafeHtml {
    return this._postContent;
  }
  public set postContent(value: SafeHtml) {
    this._postContent = value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updatePostContent();
  }

  public updatePostContent(): void {
    const postContent = this.form.get('postContent')?.value;
    const parsedInput = parsePostContent(postContent);
    this._playgroundOutput = this._safeHtmlPipe.transform(parsedInput);
  }

  public ngOnInit(): void {
    this.form = new UntypedFormGroup({
      postContent: new UntypedFormControl('', Validators.required),
    });
  }
}
