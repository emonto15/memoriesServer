var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
    development: {
        root: rootPath,
        app: {
            name: 'reviewsServer'
        },
        port: process.env.PORT || 3000,
        db: 'mongodb://localhost/memoriesServer-development'
    },

    test: {
        root: rootPath,
        app: {
            name: 'reviewsServer'
        },
        port: process.env.PORT || 3000,
        db: 'mongodb://localhost/memoriesServer-test'
    },

    production: {
        root: rootPath,
        app: {
            name: 'reviewsServer'
        },
        port: process.env.PORT || 3000,
        db: 'mongodb://localhost/memoriesServer-production'
    }
};

module.exports = config[env];