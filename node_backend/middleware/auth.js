const jwt = require('jsonwebtoken');
const config = process.env;

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.header['x-access-token'];
    
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        // req.user = decoded;
        res.status(200).json({decoded: decoded});
    } catch (error) {
        return res.status(401).send('Invalid Token');
    }

    return next();
}

module.exports = verifyToken;