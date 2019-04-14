const createError = require('http-errors');
const userModel=require('../models/users');


module.exports =async (req, res, next) => {
    try {
        if (!req.headers.authorization) return next(createError(401))

        const [, token] = req.headers.authorization.split(' ');
        const user =await userModel.verifyToken(token);
        if(!user) next(createError(401));

        //7tena hna l user fel request 3shan ybh2a m3aya msh kol showaya ahit l db
        //3shan lw feh routs tanya m7taga l currentuser da
        req.user=user;
        next();
    } catch (err){
        next(createError(401));
    }
}