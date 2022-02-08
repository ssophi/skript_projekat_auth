import express from 'express'
import bodyParser from 'body-parser'

// import adminRoutes from './routes/admin_routes.js'
// import userAppRoutes from './routes/user_app_routes.js'
import authRoutes from './routes/auth_routes.js'

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

//import Joi from 'joi'


// import { getOneZaposleni } from './controllers/zaposleni_controller.js'
// import Joi from 'joi';
// import { resetSlobodno } from './controllers/termin_controller.js'

const app = express()
const PORT = process.env.PORT || 9000;

app.use(express.static('static'));

var corsOptions = {
    origin: 'http://127.0.0.1:9000',
    optionsSuccessStatus: 200
}

app.use(cors())
app.use(bodyParser.json())

app.use('/', authRoutes)

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
}

function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect(301, '/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect(301, '/login');
    
        req.user = user;
    
        next();
    });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))