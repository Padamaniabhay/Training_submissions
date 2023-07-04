const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyUser = (req, res, next) => {
    try {
        const token = req.header("authToken");

        if (!token) {
            const error = new Error("Unauthorized");
            error.status = 401;
            throw error;
        }
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        error.status = 401;
        next(error);
    }
};

module.exports = verifyUser;
