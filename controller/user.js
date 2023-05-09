const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const userController = {
    signup: async function (req, res) {
        const {name, email, password, city} = req.body;
    
        if (!name || !email || !password || !city) {
            return res.json({
                error: true,
                body: {},
                msg: 'all fields are mandatory'
            });
        }


        try {
            const isEmailExist = await User.findOne({email});

            if (isEmailExist) {
                return res.json({
                    error: true,
                    body: {},
                    msg: 'email already exists'
                }); 
            }

            const payload  = {
                email,
                name,
                city
            }
            const salt = bcrypt.genSaltSync(10);
            const hasgPassword = bcrypt.hashSync(password, salt);
            payload.password = hasgPassword
            const result = await User.create(payload);

            const token = jwt.sign({
                id: result._id
            }, config.tokenSecret);

            const response = {
                id: result._id,
                mame: result.name,
                city: result.city,
                email: result.email,
                token
            }
            res.json({
                error: false,
                msg: 'user successfully signup',
                body: response
            })

        } catch (err) {
            res.json({
                error: true,
                body: {},
                msg: 'user signup failed'
            })
        }
    },
    login: async function (req, res) {
        const {email, password} = req.body;
    
        if (!email || !password) {
            return res.json({
                error: true,
                body: {},
                msg: 'all fields are mandatory'
            });
        }


        try {
            const isEmailExist = await User.findOne({email});
            if (!isEmailExist) {
                return res.json({
                    error: true,
                    body: {},
                    msg: 'email or password is wrong'
                });
            }

            
            
            const isPasswordTrue = bcrypt.compareSync(password, isEmailExist.password);
                if (!isPasswordTrue) {
                return res.json({
                    error: true,
                    body: {},
                    msg: 'email or password is wrong'
                });
            }
            
            const token = jwt.sign({
                id: isEmailExist._id
            }, config.tokenSecret);

            const response = {
                id: isEmailExist._id,
                mame: isEmailExist.name,
                city: isEmailExist.city,
                email: isEmailExist.email,
                token
            }
            res.json({
                error: false,
                msg: 'user successfully login',
                body: response
            })

        } catch (err) {
            res.json({
                error: true,
                body: {},
                msg: 'user login failed'
            })
        }
    }
}

module.exports = userController;