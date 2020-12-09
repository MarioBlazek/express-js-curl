# Express JS API

This is a simple REST API written in Express.js framework. The main goal behind is to
consume it via `curl` command line http client.

## Setup

Follow these steps to set up the project:
* copy `db.config.template.js` file to `db.config.js`
* create MySQL database
* update `db.config.js` with your data
* execute `npm install`
* when ready, execute `npm start`

## Dependencies

Project depends on:
* [body-parser](https://www.npmjs.com/package/body-parser)
* [express](https://www.npmjs.com/package/express)
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
* [mysql2](https://www.npmjs.com/package/mysql2)
* [sequelize](https://www.npmjs.com/package/sequelize)

## Routes

### Authorization

* POST `/auth` - requires email and password, returns token
* POST `/auth/refresh` - extends validity of token

### User management

* GET `/users` - displays a list of users 
* POST `/users` - create new user
* GET `/users/:userId` - returns info about single user
* PATCH `/users/:userId` - updates user
* DELETE `/users/:userId` - removes user

