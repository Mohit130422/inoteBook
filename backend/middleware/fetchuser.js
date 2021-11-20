const jwt = require('jsonwebtoken');
const JWT_SECRET = "StepToProgrammer$1304"

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object...

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please Authenticate with valid User detail" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next();

    } catch (error) {
        res.status(401).send({ error: "Please Authenticate with valid User detail" });
    }

}






module.exports = fetchuser;