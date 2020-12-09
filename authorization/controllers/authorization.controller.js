const jwtSecret = require('../../common/config/env.config.js').jwt_secret;
const jwt = require('jsonwebtoken');
const security = require('../../common/services/security.service');

exports.login = (req, res) => {
    try {
        let refreshId = req.body.userId + jwtSecret;
        let salt = security.getSalt();
        let hash = security.getPasswordHash(salt, refreshId);
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, jwtSecret);
        let b = Buffer.from(hash);
        let refresh_token = b.toString('base64');

        res.status(201).send({accessToken: token, refreshToken: refresh_token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};
