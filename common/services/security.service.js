const crypto = require('crypto');

exports.getSalt = () => {
    return crypto.randomBytes(16).toString('base64');
};

exports.getPasswordHash = (salt, password) => {
    return crypto.createHmac('sha512', salt).update(password).digest("base64");
};