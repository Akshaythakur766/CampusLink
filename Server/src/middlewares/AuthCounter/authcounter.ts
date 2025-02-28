import jwt from "jsonwebtoken";
import {config} from  "@CampusLink/Server/Config"
 function authroization(roles:string[]) {
    return function(req:any, res:any, next:any) {
        const  {token}  = req.cookies;
        if (!token) {
            return res.status(401).json('No token provided');
        }
        jwt.verify(token, config.jwtSecret, {}, (err:any, user:any) => {
            if (err) {
                return res.status(403).json('Failed to authenticate token');
            }

            const userRole = user.role;
            if (roles.includes(userRole)) {
                req.user = user; 
                next();
            } else {
                res.status(403).json('Forbidden');
            }
        });
    };
}

export {authroization}