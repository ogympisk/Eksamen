const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, process.env.JWTSECRET, (err, decodedToken) =>{
            if (err) {
                console.log(err.message);
                res.redirect('/login')
            }else{
                next()
            }
        })
    } else{
    res.redirect('/login')
    }
}

const checkUser = (req, res, next) =>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.JWTSECRET, async (err, decodedToken) =>{
     if (err) {
         res.locals.user = null;
         next();
     }else{
         let user = await User.findById(decodedToken.id)
         res.locals.user = user;
         next();
            }
        });
    }else{
        res.locals.user = null;
        next();
    }
}
const requireAdmin = (req, res, next) => {
    const token = req.cookies.admin

    if(token == 'true'){
      next()
    }else{
        res.redirect('/')
    }
} 
const realUser = (req,res,next) =>{
    const name = user.email
    
}
        


module.exports = { requireAuth, checkUser, requireAdmin, realUser};