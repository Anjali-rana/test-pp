const jwt = require('jsonwebtoken');
const config = require('./config');

const middleWare = {
    verifyToken: async function (req, res, next) {
            try {
                const token = req.headers.authorization;
                console.log("innnnnnnnnnnnnnnnnnn")
                if (!token) {
                    return res.json({
                        error: true,
                        body: {},
                        msg: 'please provide token'
                    });
                }
                const isValid = jwt.verify(token, config.tokenSecret);

                if (!isValid) {
                    return res.json({
                        error: true,
                        body: {},
                        msg: 'invalid token'
                    });
                }
                console.log("token", isValid)
                req.userId = isValid.id
                next();
            } catch (err) {
                return res.json({
                    error: true,
                    body: {},
                    msg: 'invalid token'
                });
            }
        }
}
module.exports = middleWare;