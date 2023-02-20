import { Request, Response } from 'express';

export async function testGet(req: Request, res: Response) {
    res.send({ message: 'Hello API' });
}