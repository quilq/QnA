const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017';

let db;

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');

    db = client.db('mydb');
});

function insertQuestion(question) {
    db.collection('qna').insertOne(question, (error, result) => {
        if (error) {
            console.log('Cannot insert document');
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
}

function deleteQuestion(id) {
    db.collection('qna').findOneAndDelete({ _id: new ObjectID(id) }).then((result) => {
        console.log(JSON.stringify(result.value, undefined, 2));
    });
}

function updateQuestion(oldQuestion, newQuestion) {
    db.collection('qna').findOneAndUpdate({
        //filter
        question: oldQuestion
    }, {
            //update
            $set: { question: newQuestion }
        }, {
            //option
            returnOriginal: false
        }).then((result) => {
            console.log(JSON.stringify(result.value, undefined, 2));
        });
}

function updateAnswer(question, newAnswer) {
    db.collection('qna').updateOne(
        { question: question, answer: question.oldAnswer },
        { $set: { 'answer.$': newAnswer } }
    )
}

function addAnswer(question, newAnswer) {
    db.collection('qna').updateOne(
        { question: question },
        { $push: { answer: newAnswer } }
    )
}

function deleteAnswer(question, answer) {
    db.collection('qna').updateOne(
        { question: question },
        { $pull: { answer: answer } }
    )
}

//Middleware that is specific to this route
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
})

//Create questions
router.post('/q', (req, res) => {
    insertQuestion(req.body);
});

//Find questions
router.get('/q/:id', (req, res) => {
    db.collection('qna').find({ _id: new ObjectID(req.params.id) }).toArray().then((docs) => {
        console.log(docs);
    }, (err) => {
        console.log('Unable to fetch data ', err);
    });
});

//Update question
router.put('/q', (req, res) => {
    updateQuestion(req.body[0].oldQuestion, req.body[0].newQuestion);
});

//Delete question
router.delete('/q/:id', (req, res) => {
    deleteQuestion(req.params.id);
});

//Add answer
router.put('/a/add', (req, res) => {
    addAnswer(req.body[0].question, req.body[1]);
});

//Update answer 
router.put('/a/update', (req, res) => {
    updateAnswer(req.body[0].question, req.body[1]);
});

//Delete answer
router.put('/a/delete', (req, res) => {
    deleteAnswer(req.body[0].question, req.body[1]);
});

module.exports = router;