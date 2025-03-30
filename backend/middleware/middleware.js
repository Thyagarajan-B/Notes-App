const jwt = require('jsonwebtoken');
const User = require('../models/user');

const middleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, 's123');
        } catch (error) {
            return res.status(401).json({ success: false, message: "Invalid or expired token" });
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: "No user found" });
        }

        req.user = { name: user.name, id: user._id };
        next();
    } catch (err) {
        console.error("Middleware Error:", err);
        return res.status(500).json({ success: false, message: "Internal Server Error - Please log in again" });
    }
};

module.exports = middleware;
