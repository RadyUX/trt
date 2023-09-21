const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();

function authRole(role) {
    return (req, res, next) => {
        try {
            const token = req.cookies.accessToken;
            if(!token) {
                return res.status(401).json({ message: "Authorization header missing." });
            }

            const decodedToken = jwt.verify(token, process.env.JWT);
            
            if (!decodedToken.role || decodedToken.role !== role) {
                return res.status(403).json({ message: `Access denied. You don't have the required role : ${role}` });
            }
            console.log("Decoded token:", decodedToken);

            next();  // If role matches, continue to the next middleware or route handler
        } catch (error) {
            console.error("JWT verification failed:", error)
            return res.status(401).json({ message: "Invalid token." });
        }
    }
}


function authUser(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send('Vous devez vous connecter');
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(401).send('Token invalide ou expiré');
    }
}

module.exports = {authRole, authUser}