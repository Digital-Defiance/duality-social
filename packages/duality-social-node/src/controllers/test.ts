import { Request, Response } from 'express';

export async function testGet(req: Request, res: Response) {
    res.json({ message: 'Hello API' });
}