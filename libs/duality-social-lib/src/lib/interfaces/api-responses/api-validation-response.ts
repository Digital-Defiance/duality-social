import { ValidationError } from 'express-validator';
export interface IApiExpressValidationErrorResult {
    errors: ValidationError[];
}