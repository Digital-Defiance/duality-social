import { Component, Input, ViewEncapsulation } from "@angular/core";
import { SafeHtml } from "@angular/platform-browser";
import { parsePostContent } from "@digital-defiance/duality-social-lib";
import { SafeHtmlPipe } from "../../pipes/safe-html.pipe";

@Component({
    selector: "app-post-preview",
    templateUrl: "./post-preview.component.html",
    styleUrls: ["./post-preview.component.css"],
    encapsulation: ViewEncapsulation.None,
    providers: [SafeHtmlPipe]  
})
export class PostPreviewComponent {
    @Input()
    public set PreviewInput(value: string) {
        this._previewInput = value;
        const parsedInput = parsePostContent(this._previewInput);
        this._previewOutput = this._safeHtmlPipe.transform(parsedInput);
    }
    private _previewInput = "";

    constructor(private _safeHtmlPipe: SafeHtmlPipe) {}

    public get PreviewOutput(): SafeHtml {
      return this._previewOutput;
    }
    public set PreviewOutput(value: SafeHtml) {
      this._previewOutput = value;
    }
    private _previewOutput: SafeHtml = "" as SafeHtml;
}