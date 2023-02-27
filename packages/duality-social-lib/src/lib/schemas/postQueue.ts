import { Schema } from 'mongoose';
import { prop } from '@typegoose/typegoose';

export class PostQueue {
    @prop()
    public readonly content: string;
    @prop()
    public readonly dataUrls: string[];
    @prop()
    public aiResponse?: string;
    @prop()
    public aiResponseImages?: string[];
    @prop()
    public aiResponseCompleted?: Date;
    @prop()
    public createdAt: Date = new Date();
    @prop()
    public createdBy: Schema.Types.ObjectId;
    @prop()
    public updatedAt: Date;
    @prop()
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