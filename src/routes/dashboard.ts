import express, { Request } from 'express';
import authenticate from '../middleware/auth';
import AppError from '../config/error';
const DashboardRouter = express.Router();

DashboardRouter.get('/', authenticate, async (req: any, res: any, next: any) => {
    try {
        res.render('dashboard', {
            user: req.user
        });
    } catch (err) { next(err); }
});

DashboardRouter.get('/not-found', authenticate, async (req: any, res: any, next: any) => {
    try {
        throw new Error();
    } catch (err) { next(err); }
});

DashboardRouter.get('/not-found', authenticate, async (req: any, res: any, next: any) => {
    try {
        throw new AppError(404, 'Not found');
    } catch (err) { next(err); }
});

export default DashboardRouter;