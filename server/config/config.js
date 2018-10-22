let env = process.env.NODE_ENV || 'development';
// changed localhost to 127.0.0.1
// apparently takes time to figure out what the IP of localhost is
if (env === 'development' || env === 'test') {
    let config = require('./config.json');
    let envConfig = config[env];

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}