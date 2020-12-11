const { User } = require('../../users/models/user.model');
const security = require('../../common/services/security.service');

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return res.status(400).send({errors: errors.join(', ')});
        } else {
            return next();
        }
    } else {
        return res.status(400).send({errors: 'Missing email and password fields'});
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {

        if (user === null) {
            return res.status(400).send({errors: ['Invalid e-mail or password']});
        }

        let passwordFields = user.password.split('$');
        let salt = passwordFields[0];
        let hash = security.getPasswordHash(salt, req.body.password);
        if (hash === passwordFields[1]) {
            req.body = {
                userId: user.id,
                email: user.email,
                permissionLevel: user.permissionLevel,
                provider: 'email',
                name: user.firstName + ' ' + user.lastName,
            };
            return next();
        } else {
            return res.status(400).send({errors: ['Invalid e-mail or password']});
        }

    });
};