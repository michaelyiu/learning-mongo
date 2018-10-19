const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });

module.exports = { mongoose };