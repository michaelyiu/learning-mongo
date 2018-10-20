const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user')

// Todo.deleteOne({}).then((result) => {
//     console.log(result);
// });


// Todo.findOneAndRemove
// Todo.findByIdAndRemove


Todo.findByIdAndRemove('5bcab337d8cc0a741410424c').then((todo) => {
    console.log(todo);
    
});