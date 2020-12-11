const jwt = require('jsonwebtoken');
const secret = require('../config/env.config.js').jwt_secret;
const security = require('../services/security.service');

exports.verifyRefreshBodyField = (req, res, next) => {
    if (req.body && req.body.refreshToken) {
        return next();
    } else {
        return res.status(400).send({error: 'need to pass refresh_token field'});
    }
};

exports.validRefreshNeeded = (req, res, next) => {
    let refreshToken = security.refreshToken(req.body.refreshToken);
    let hash = security.getPasswordHash(req.jwt.refreshKey, req.jwt.userId + secret);

    if (hash === refreshToken) {
        req.body = req.jwt;
        return next();
    } else {
        return res.status(400).send({error: 'Invalid refresh token'});
    }
};

exports.validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                req.jwt = jwt.verify(authorization[1], secret);
                return next();
            }

        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }
};