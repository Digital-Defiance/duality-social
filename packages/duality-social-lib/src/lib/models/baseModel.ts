import { model as makeModel, Model as MongooseModel, Schema as MongooseSchema } from "mongoose";
import { IHasID } from "../interfaces/hasId";

abstract class Base {
    protected static ModelRegistry: Map<string, MongooseModel<unknown>> = new Map<string, MongooseModel<unknown>>();
    constructor(model: MongooseModel<unknown>) {
        if (BaseModel.ModelRegistry.has(model.modelName)) {
            throw new Error(`Model ${model.modelName} already exists`);
        }
        BaseModel.ModelRegistry.set(model.modelName, model);
    }
    public static getModel<T>(model: string): MongooseModel<T&Document> {
        if (!BaseModel.ModelRegistry.has(model)) {
            throw new Error(`Model ${model} does not exist`);
        }
        return BaseModel.ModelRegistry.get(model) as MongooseModel<T&Document>;
    }
}

export class BaseModel<T extends IHasID<U>, U = MongooseSchema.Types.ObjectId> extends Base {
    public readonly Name: string;
    public readonly Path: string;
    public readonly Schema: MongooseSchema;
    public readonly Collection?: string;
    public readonly Model: MongooseModel<T&Document>;
    constructor(name: string, path: string, schema: MongooseSchema, collection?: string) {
        const newModel = makeModel<T&Document>(name, schema, collection);
        super(newModel as MongooseModel<unknown>);
        this.Name = name;
        this.Path = path;
        this.Schema = schema;
        this.Collection = collection;
        this.Model = newModel;
    }
}