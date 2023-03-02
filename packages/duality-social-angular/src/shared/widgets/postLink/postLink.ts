import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-post-link',
    templateUrl: './postLink.html',
    styleUrls: ['./postLink.css']
})
export class PostLinkComponent {
    @Input()
    public get url(): string { return this._url ?? ''; }
    public set url(url: string) {
        this._url = url && url.trim();
    }
    private _url?: string;

    @Input()
    public get postId(): string { return this._postId ?? ''; }
    public set postId(postId: string) {
        this._postId = postId && postId.trim();
    }
    private _postId?: string;
}