import express from 'express';
import User from '../models/user';
const AuthRouter = express.Router();

AuthRouter.get('/login', async (req, res, next) => {
    try {
        res.render('login');
    } catch (err) {
        next(err);
    }
});

AuthRouter.get('/signup', async (req, res, next) => {
    try {
        res.render('signup');
    } catch (err) {
        next(err);
    }
});

AuthRouter.get('/dashboard', async (req, res, next) => {
    try {
        res.render('dashboard');
    } catch (err) {
        next(err);
    }
});

AuthRouter.post('/login', async (req, res, next) => {
    try {

        const body = req.body;
        const obj = {
            email: String(body.email),
            password: String(body.password),
        };

        let user = await User.findOne({ email: obj.email });

        if (!user) {
            res.render('login', {
                error: 'No such user.'
            });

            return;
        }

        const validPassword = await user.validatePassword(obj.password);
        if (!validPassword) {
            res.render('login', {
                error: 'No such user.'
            });

            return;
        }

        res.cookie('email', obj.email);
        res.redirect('/dashboard');
    } catch (err) { next(err); }
});

AuthRouter.post('/signup', async (req, res, next) => {
    try {
        const body = req.body;
        const obj = {
            email: String(body.email),
            password: String(body.password),
        };

        let user = await User.findOne({ email: obj.email });

        if (user) {
            res.render('signup', {
                error: 'User with this email already exists.'
            });

            return;
        }

        user = await User.create(obj);

        res.render('login', {
            message: 'Your account created. Please login!'
        });
    } catch (err) { next(err); }
});

AuthRouter.get('/logout', async (req, res, next) => {
    try {
        res.clearCookie('email');
        res.redirect('/auth/login');
    } catch (err) { next(err); }
});

export default AuthRouter;