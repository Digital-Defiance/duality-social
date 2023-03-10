import { model as makeModel, Model as MongooseModel, Schema as MongooseSchema } from "mongoose";
import { IHasID } from "../interfaces/hasId";

export class BaseModel<T extends IHasID<U>, U = string> {
    public readonly Name: string;
    public readonly Path: string;
    public readonly Schema: MongooseSchema;
    public readonly Collection?: string;
    public readonly Model: MongooseModel<T&Document>;
    constructor(name: string, path: string, schema: MongooseSchema, collection?: string) {
        this.Name = name;
        this.Path = path;
        this.Schema = schema;
        this.Collection = collection;
        this.Model = makeModel<T&Document>(this.Name, this.Schema, this.Collection);
    }
}