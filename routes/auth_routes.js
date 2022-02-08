import express from 'express'

import { createZaposleni } from '../controllers/zaposleni_controller.js'
import { loginZaposleni } from '../controllers/zaposleni_controller.js'

import { createUser } from '../controllers/user_controller.js'
import { getOneUser } from '../controllers/user_controller.js'
//import router from './admin_routes.js'
import Joi from 'joi'

const router = express.Router()

function authToken(req, res, next) {
    const authHeader = req.headers['Authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (token == null) return res.status(401).json({ msg: err });
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.status(403).json({ msg: err });
    
        req.user = user;
    
        next();
    });
}

// const sema = Joi.object().keys({
//     username: Joi.string().trim().username().required(),
//     password: Joi.string().min(4).max(12).required()
// });


router.post('/login/zaposleni', loginZaposleni)
router.use(authToken);

router.post('/register/user', createUser)
router.post('/register/zaposleni',createZaposleni)


export default router