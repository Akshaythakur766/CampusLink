const jwt=require("jsonwebtoken")


 function authroization(roles) {
    return function(req, res, next) {
        const  {token}  = req.cookies;
        if (!token) {
            return res.status(401).json('No token provided');
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, {}, (err, user) => {
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

module.exports={authroization}