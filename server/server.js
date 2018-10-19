const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');


const { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');


let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000');
})

// GET /todos 12341234
app.get('/todos/:id', (req, res) => {
    let id = req.params.id;
    // res.send(req.params);


    //Valid id using isValid
    //404 response - send back emplty body
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({ todo });

    }).catch((error) => {
        return todo.status(400).send();
    })
    //findById
    //success
      //if todo = send it back
      //if no todo - send back 404 with empty body
    //error send 400 and send empty body back

})


module.exports = { app };