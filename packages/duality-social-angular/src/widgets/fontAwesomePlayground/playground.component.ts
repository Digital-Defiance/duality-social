import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { parseIconMarkup } from '@digital-defiance/duality-social-lib';

@Component({
  selector: 'app-fa-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css'],
})
export class PlaygroundComponent implements OnInit {
  // constructor() {}
  /**
   * Whether to show the new post input box.
   */
  public form!: UntypedFormGroup;
  private _playgroundOutput = '';
  public get PlaygroundOutput(): string {
    return this._playgroundOutput;
  }
  private _postContent = '';
  public get postConent(): string {
    return this._postContent;
  }
  public set postContent(value: string) {
    this._postContent = value;
    const parsedInput = parseIconMarkup(this._postContent);
    this._playgroundOutput = parsedInput;
  }

  public ngOnInit(): void {
    this.form = new UntypedFormGroup({
      postContent: new UntypedFormControl('', Validators.required),
    });
  }
}
