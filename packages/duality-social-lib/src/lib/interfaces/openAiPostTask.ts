import { Schema } from "mongoose";

export class OpenAiTask {
    public readonly createdAt: Date = new Date();
    public completedAt?: Date;
    public postId?: Schema.Types.ObjectId;
}