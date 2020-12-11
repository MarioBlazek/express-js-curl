const { User } = require('../models/user.model');
const security = require('../../common/services/security.service');

exports.insert = (req, res) => {
    let salt = security.getSalt();
    let hash = security.getPasswordHash(salt, req.body.password);
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;

    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        permissionLevel: req.body.permissionLevel,
    }).then((user) => {
        res.status(201).send({id: user.id});
    });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let offset = req.query.offset ? parseInt(req.query.limit) : 0;

    User.findAll({limit: limit, offset: offset})
        .then((results) => {
            res.status(200).send(results);
        });
};

exports.getById = (req, res) => {
    User.findByPk(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};
exports.patchById = (req, res) => {
    if (req.body.password) {
        let salt = security.getSalt();
        let hash = security.getPasswordHash(salt, req.body.password);
        req.body.password = salt + "$" + hash;
    }

    User.findByPk(req.params.userId)
        .then((user) => {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.password = req.body.password;

            user.save().then((result) => {
                res.status(200).send({});
            });
        });
};

exports.removeById = (req, res) => {
    User.destroy({
        where: {
            id: req.params.userId
        }
    }).then((result) => {
        res.status(204).send({});
    });
};