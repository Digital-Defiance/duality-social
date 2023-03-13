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
        expect(retrievedModel.modelName).toBe(modelName);
    });
    it('should not allow the same model to be added twice', () => {
        const newModel1 = new BaseModel('test', '/test', new Schema());
        const newModel2 = new BaseModel('test2', '/test', new Schema());
        expect(() => new BaseModel('test', '/test', new Schema())).toThrowError('Cannot overwrite `test` model once compiled.');
    });
});