import { Schema } from 'mongoose';
import { BaseModel } from './baseModel';

describe('BaseModel', () => {
    it('should be able to create a new model', () => {
        const modelName = 'test;'
        const newModel = new BaseModel(modelName, '/test', new Schema());
        expect(newModel).toBeDefined();
        expect(newModel.Model).toBeTruthy();
        const retrievedModel = BaseModel.getModel(modelName);
        expect(retrievedModel).toBe(newModel.Model);
    });
});