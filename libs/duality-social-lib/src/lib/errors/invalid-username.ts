import { AppConstants } from "../constants";

export class InvalidUsernameError extends Error {
    constructor() {
        super(AppConstants.UsernameRegexError);
        this.name = 'InvalidUsernameError';
    }
}