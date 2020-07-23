import { Request, Response, NextFunction } from 'express';

export interface IRequest extends Request {
    //access?: any
    access?: {
        idUser: number,
        accessLevel: number,
        msg?: string
    };
} 