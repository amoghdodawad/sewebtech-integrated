const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Users } = require('../models/models.js');
const { json } = require('body-parser');
const SECRET_KEY = 'A1_SE_WEBTECH_PROJECT_2023_2024';

function generateAccessToken(payload, secretKey, expiryTime){
    return jwt.sign({...payload}, secretKey, {
        expiresIn : expiryTime
    });
}

function generateRefreshToken(payload, secretKey, expiryTime){
    return jwt.sign({...payload}, secretKey,{
        expiresIn : expiryTime
    });
}

async function verifyToken(token, secretKey){
    return new Promise(function (resolve, reject){
        jwt.verify(token, secretKey, function(err, decoded){
            if(err) {
                reject('Token not valid');
            }
            resolve(decoded);
        })
    })
}

async function generateHash(password, numberOfSalts = 4){
    return new Promise(function (resolve,reject){
        bcrypt.hash(password, numberOfSalts, function(err, hash){
            if(err){
                reject(err);
            }
            resolve(hash);
        })
    })
}

async function comparePassword(password, hash){
    return new Promise(function(resolve,reject){
        bcrypt.compare(password, hash, function(err,hash){
            if(err){
                reject(err);
            }
            resolve(hash);
        })
    })
}

async function signUp(req,res){
    let { name, email, password, role } = req.body;
    // console.log(email.toLowerCase());
    email = email.toLowerCase().split(' ')[0];
    bcrypt.hash(password, 4, async function (err, hash){
        if(err){
            res.statusCode = 500;
            return res.json({
                message : 'An error occured while generating the password hash'
            });
        }
        const user = new Users({
            name,
            email,
            password : hash,
            role
        });

        try {
            await user.save();
            const token = generateAccessToken({
                name,
                email,
                role
            }, SECRET_KEY, '24h');

            res.append('Access-Control-Expose-Headers','*');
            res.append('token',token);
            res.status(200).json({
                message : 'OK',
                name,
                email,
                role
            });
        } catch (error) {
            if(error.code === 11000){
                return res.status(400).json({
                    message : 'User with this email already exists!'
                })
            } else {
                return res.status(500).json({
                    message : 'User could not be signed up!'
                })
            }
        }
    }) 
}

async function logIn(req,res){
    let { email, password } = req.body;
    // console.log(email.toLowerCase());
    email = email.toLowerCase();
    try {
        const user = await Users.findOne({
            email : email
        },{
            _id : 0,
            name : 1,
            password : 1,
            role : 1
        });
        bcrypt.compare(password, user.password, function(err, hash){
            if(err){
                return res.status(500).json({
                    message : 'Could not authenticate'
                });
            }
            if(hash){
                const token = generateAccessToken({
                    name : user.name,
                    email : email,
                    role : user.role
                }, SECRET_KEY, '24h');

                res.append('Access-Control-Expose-Headers','*');
                res.append('token',token);
                res.status(200).json({
                    message : 'OK',
                    name : user.name,
                    email : email,
                    role : user.role
                });
            } else {
                res.status(400).json({
                    message : 'Enter the correct password'
                })
            }
        })
    } catch (error){
        res.status(400).json({
            message : 'User does not exist! Try signing up.'
        })
    }
}

async function verifyLoggedIn(req, res){
    const { token } = req.body;
    
    try {
        const payload = await verifyToken(token, SECRET_KEY);
        const newToken = generateAccessToken({
            name : payload.name,
            email : payload.email,
            role : payload.role,
        },SECRET_KEY, '24h')
        res.status(200).json({
            message : 'OK Authenticated',
            token : newToken
        })
    } catch (error) {
        res.status(401).json({
            message : 'Not authenticated'
        })
    }
}

async function verifyRole(req,res){
    const { token, role } = req.body;
    try {
        const payload = await verifyToken(token, SECRET_KEY);
        console.log(payload);
        if(payload.role === role){
            res.status(200).json({
                message : 'User authenticated as admin'
            });
        } else {
            res.status(401).json({
                message : 'User is not an admin'
            })
        }
    } catch(error){
        console.log(error);
        res.status(400).json({
            message : 'Token invalid/expired'
        });
    }
}

module.exports = {
    signUp,
    logIn,
    verifyRole,
    verifyLoggedIn
}