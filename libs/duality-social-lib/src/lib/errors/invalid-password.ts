import { AppConstants } from "../constants";

export class InvalidPasswordError extends Error {
    constructor() {
        super(AppConstants.PasswordRegexError);
        this.name = 'InvalidPassword';
    }
}