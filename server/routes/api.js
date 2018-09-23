const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017';
const { User } = require('./../models/user');

var { authenticate } = require('./../middleware/authenticate');
var db;

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log('Unable to connect to MongoDB server.');
    } else {
        console.log('Connected to MongoDB server.');
    }

    db = client.db('mydb');
});

function deleteQuestion(id) {
    db.collection('qna').findOneAndDelete({ _id: new ObjectID(id) }).then((result) => {
        console.log(JSON.stringify(result.value, undefined, 2));
    });
}

function updateQuestion(id, newQuestion) {
    console.log(id, newQuestion);
    db.collection('qna').findOneAndUpdate({
        //filter
        _id: new ObjectID(id)
    }, {
            //update
            $set: { question: newQuestion }
        }, {
            //option
            returnOriginal: false
        }, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
}

function updateAnswer(id, oldAnswer, newAnswer) {
    db.collection('qna').updateOne(
        { _id: new ObjectID(id) },
        { $set: { 'answers.$[element].answer': newAnswer.answer } },
        //Filter answers array to update
        { arrayFilters: [{ "element.answer": oldAnswer.answer }] }
    )
}

function addAnswer(id, answer) {
    db.collection('qna').updateOne(
        { _id: new ObjectID(id) },
        //Push answer to answers array
        { $push: { answers: answer } }
    )
}

function deleteAnswer(id, answer) {
    db.collection('qna').updateOne(
        { _id: new ObjectID(id) },
        { $pull: { answers: { answer: answer.answer } } }
    )
}

//Timelog middleware that is specific to this route
// router.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now());
//     next();
// })

//Create questions
router.post('/q', (req, res) => {
    db.collection('qna').insertOne(req.body, (error, result) => {
        if (error) {
            console.log('Cannot insert document');
        }
        res.status(200).send(result.ops[0]._id);
        console.log(result.ops[0]._id)
    });
});

//Find questions
router.get('/q/:id', (req, res) => {
    db.collection('qna').findOne({ _id: new ObjectID(req.params.id) }, (err, doc) => {
        if (err) {
            console.log('Unable to fetch data ', err);
        } else {
            res.json(doc);
        }
    })
});

//Fetch all questions
router.get('/q', (req, res) => {
    db.collection('qna').find().toArray((err, doc) => {
        if (err) {
            console.log('Unable to fetch data ', err);
        } else {
            res.json(doc);
        }
    });
})

//Update question
router.put('/q', (req, res) => {
    updateQuestion(req.body.id, req.body.newQuestion);
});

//Delete question
router.delete('/q/:id', (req, res) => {
    deleteQuestion(req.params.id);
});

//Add answer
router.put('/a/add', (req, res) => {
    addAnswer(req.body.id, req.body.answer);
});

//Update answer 
router.put('/a/update', (req, res) => {
    updateAnswer(req.body.id, req.body.oldAnswer, req.body.newAnswer);
});

//Delete answer
router.put('/a/delete', (req, res) => {
    deleteAnswer(req.body.id, req.body.answer);
});

//Get user info (private route)
router.get('/user/me', authenticate, (req, res) => {
    let user = req.user;
    let userQuestions;
    let userAnswers;

    db.collection('qna').find({ askedByUser: user.username }).toArray().then(docs => {
        userQuestions = docs;
        db.collection('qna').find(
            {
                answers: {
                    $elemMatch: {
                        answeredByUser: user.username
                    }
                }
            }).toArray().then(docs => {
                userAnswers = docs;
                res.json({user, userQuestions, userAnswers });
            });
    });

})

//Sign up route
router.post('/user/signup', (req, res) => {
    var body = { username: req.body.username, email: req.body.email, password: req.body.password };
    var user = new User(body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

//Log in route
router.post('/user/login', (req, res) => {
    var body = { email: req.body.email, password: req.body.password };

    //Find user
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send(e);
    });
})

//Log out route
router.delete('/user/me/token', authenticate, (req, res) => {
    if (req.user) {
        // req.user.removeToken(req.token).then(() => {
        //If successfuly remove token
        res.status(200).send();
    } else {
        //If fail to remove token
        res.status(400).send();
    }
})

module.exports = router;