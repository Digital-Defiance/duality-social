import { IApiMessageResponse } from "./api-message-response";
import { IRequestUser } from "../request-user";

export interface IUserResponse extends IApiMessageResponse {
    user: IRequestUser;
}