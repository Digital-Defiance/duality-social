import { model as makeModel, Model as MongooseModel, Schema as MongooseSchema } from "mongoose";
import { IHasID } from "../interfaces/hasId";

abstract class Base {
    protected static ModelRegistry: Map<string, MongooseModel<unknown>> = new Map<string, MongooseModel<unknown>>();
    public readonly Name: string;
    constructor(name: string, model: MongooseModel<unknown>) {
        this.Name = name;
        if (BaseModel.ModelRegistry.has(name)) {
            throw new Error(`Model ${name} already exists`);
        }
        BaseModel.ModelRegistry.set(name, model);
    }
    public static getModel<T>(model: string): MongooseModel<T&Document> {
        if (!BaseModel.ModelRegistry.has(model)) {
            throw new Error(`Model ${model} does not exist`);
        }
        return BaseModel.ModelRegistry.get(model) as MongooseModel<T&Document>;
    }
}

export class BaseModel<T extends IHasID<U>, U = MongooseSchema.Types.ObjectId> extends Base {
    public readonly Path: string;
    public readonly Schema: MongooseSchema;
    public readonly Collection?: string;
    public readonly Model: MongooseModel<T&Document>;
    constructor(name: string, path: string, schema: MongooseSchema, collection?: string) {
        const newModel = makeModel<T&Document>(name, schema, collection);
        super(name, newModel as MongooseModel<unknown>);
        this.Path = path;
        this.Schema = schema;
        this.Collection = collection;
        this.Model = newModel;
    }
}