let env = process.env.NODE_ENV || 'development';
console.log('env ***', env);

// changed localhost to 127.0.0.1
// apparently takes time to figure out what the IP of localhost is
if (env === "development") {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoApp';
} else if (env === "test") {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoAppTest';
}