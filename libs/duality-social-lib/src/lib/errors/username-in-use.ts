export class UsernameInUseError extends Error {
    constructor() {
        super('Username is already in use');
        this.name = 'UsernameInUseError';
    }
}