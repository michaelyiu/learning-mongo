const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user')


// let id = '5bca4aad49b01a32dc6f8b0111';

// if(!ObjectID.isValid(id)){
//     console.log('Id not valid');
    
// }

//gets array
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// })

// //gets single document
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// })

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo By Id', todo);
// }).catch((err) => console.log(err)); 

User.findById('5bc924567463a331c4c885ef').then((user) => {
    if(!user){
        return console.log('Unable to find user');
    }
    console.log(JSON.stringify(user, undefined, 2));
    
}, (err) => {
    console.log(err);
})