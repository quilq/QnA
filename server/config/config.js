var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    var config = require('./config.json');
    var envConfig = config[env];

    //Take object and return keys inside as an array
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    })
}