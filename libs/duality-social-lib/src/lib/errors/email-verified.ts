export class EmailVerifiedError extends Error {
    constructor() {
        super('Email has already been verified');
        this.name = 'EmailVerifiedError';
    }
}