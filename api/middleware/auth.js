const jwt = require("jsonwebtoken")

function authRole(role) {
    return (req, res, next) => {
        try {
            const authorizationHeader = req.headers.authorization;
            if(!authorizationHeader) {
                return res.status(401).json({ message: "Authorization header missing." });
            }

            const token = authorizationHeader.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.JWT);
            
            if (!decodedToken.role || decodedToken.role !== role) {
                return res.status(403).json({ message: "Access denied. You don't have the required role." });
            }

            next();  // If role matches, continue to the next middleware or route handler
        } catch (error) {
            return res.status(401).json({ message: "Invalid token." });
        }
    }
}

module.exports = authRole