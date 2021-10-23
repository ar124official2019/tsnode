import { NextFunction, Request, Response } from "express";
import User from "../models/user";

export default async function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const email = req.cookies['email'];
        if (!email) throw 0;

        const user = await User.findOne({
            email
        });

        if (!user) throw 0;

        Object.defineProperty(req, 'user', {
            value: user
        });

        next();
    } catch (err) {
        res.redirect('/auth/login');
    }
}