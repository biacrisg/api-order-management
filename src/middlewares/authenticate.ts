import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface PayLoad {
    sub: string
}

export function authenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).end();
    }

    try{
        const {sub} = verify(authToken, process.env.JWT_SECRET) as PayLoad;

        //coloca o id do token dentro de uma variavel
        req.user_id = sub;
    } catch(err){
        return res.status(401).end();
    }

    return next();
}