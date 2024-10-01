const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../controllers/authController').JWT_SECRET;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    const token = authHeader && authHeader.split('')[1];

    if(!token)
        res.status(403).json( {code:403, message:'token no existe'} );

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err){
            switch(err.name){
                case 'JsonWebTokenError': return res.status(403).json( {code:403, message:'token error'} );
                case 'TokenExpiredError': res.status(401).json( {code:401, message:'token expirado'} );
                default: res.status(400).json( {code:400, message:'Token aña?'} );
            }
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;