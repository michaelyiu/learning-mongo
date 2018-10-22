require('./config/config')



const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');


const { mongoose } = require('./db/mongoose');
let { Todo } = require('./models/todo');
let { User } = require('./models/user');
let { authenticate } = require('./middleware/authenticate');


let app = express();
const port = process.env.PORT

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

app.delete('/todos/:id', (req, res) => {
    //get the id
    let id = req.params.id;
    //validate the id -> not valid? return 404

    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findByIdAndDelete(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((err) => {
        return todo.status(400).send();
    })
    //remove todo by id
        //success
            //if no doc send 404
            //if doc send doc with 200
        //error
            //400 with empty body
})

app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['text', 'completed'])

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set : body}, {new: true})
        .then((todo) => {
            if(!todo){
                return res.status(404).send();
            }
            res.send({ todo });

        }).catch((err) => {
            res.status(400).send();
        })
})

//POST /users

app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);


    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    })
});


//POST /users/login {email, password}

app.post('/users/login', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        // res.send(user);
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        })
    }).catch((err) => {
        res.status(400).send();
    })

});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user)
})


app.listen(port, () => {
    console.log(`Started on port ${port}`);
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