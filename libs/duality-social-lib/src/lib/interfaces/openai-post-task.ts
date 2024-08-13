import { Document, ObjectId } from "mongoose";

export class OpenAiTask extends Document {
    public readonly createdAt: Date = new Date();
    public completedAt?: Date;
    public post?: ObjectId;
}