import { Schema } from 'mongoose';

export class PostQueue {
    public readonly content: string;
    public readonly dataUrls: string[];
    public aiResponse?: string;
    public aiResponseImages?: string[];
    public aiResponseCompleted?: Date;
    public createdAt: Date = new Date();
    public createdBy: Schema.Types.ObjectId;
    public updatedAt: Date;
    public updatedBy: Schema.Types.ObjectId;

    constructor(postText: string, dataUrls: string[], createdBy: Schema.Types.ObjectId) {
        const now = new Date();
        this.content = postText;
        this.dataUrls = dataUrls;
        this.createdAt = now;
        this.createdBy = createdBy;
        this.updatedAt = now;
        this.updatedBy = createdBy;
    }

}