const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

let db;

MongoClient.connect(url, (err, client) => {
    if (err) {
        console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');

    db = client.db('QnA');
});

//Insert question
function insertQuestion(topic, question) {
    db.collection(topic).insertOne({
        question: question,
        answer: ''
    }, (error, result) => {
        if (error) {
            console.log('Cannot insert document');
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
}

//Find question
function findQuestion(topic, question) {
    db.collection(topic).find({ question: question }).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch data ', err);
    });
}

//Delete question
function deleteQuestion(topic, question) {
    db.collection(topic).findOneAndDelete({ question: question }).then((result) => {
        console.log(JSON.stringify(result.value, undefined, 2));
    });
}

//Update question
function updateQuestion(topic, oldQuestion, newQuestion) {
    db.collection(topic).findOneAndUpdate({
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

//Update answer
function updateAnswer(topic, question, answer) {
}

//Add answer
function addAnswer(topic, question) {
}

//Delete answer
function deleteAnswer(topic, question, answer) {
}

//Middleware that is specific to this route
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
})

//Find questions
router.get('/:topic/:question', (req, res) => {
    findQuestion(req.params.topic, req.params.question);
    res.send(`Get API, topic: ${req.params.topic} & question: ${req.params.question}`);
});

//Create questions
router.post('/:topic/:question', (req, res) => {
    insertQuestion(req.params.topic, req.params.question);
    res.send(`Post API, topic: ${req.params.topic} & question: ${req.params.question}`);
});

//Update question
router.put('/:topic/:oldquestion/:newquestion', (req, res) => {
    updateQuestion(req.params.topic, req.params.oldquestion, req.params.newquestion);
    res.json(`Put API, topic: ${req.params.topic}, 
        old question: ${req.params.oldquestion} & 
        new question: ${req.params.newquestion}`);
});

//Delete question
router.delete('/:topic/:question', (req, res) => {
    deleteQuestion(req.params.topic, req.params.question);
    res.json(`Delete API, topic: ${req.params.topic} & question: ${req.params.question}`);
});

module.exports = router;