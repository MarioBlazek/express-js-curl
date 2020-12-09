module.exports = {
    HOST: "myhost",
    USER: "myuser",
    PASSWORD: "mypassword",
    DB: "mydb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};