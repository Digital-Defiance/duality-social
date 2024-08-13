import { IApiMessageResponse } from "./api-message-response";
import { IMongoErrors } from "../mongo-errors";

export interface IApiMongoValidationErrorResponse extends IApiMessageResponse {
    errors: IMongoErrors;
}