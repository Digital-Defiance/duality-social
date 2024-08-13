import { Router } from "express";

export abstract class BaseRouter {
    public readonly router: Router;
    constructor() {
        this.router = Router();
    }
}