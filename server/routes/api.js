const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://localhost:27017';

let db;

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) {
        console.log('Unable to connect to MongoDB server.');
    } else {
        console.log('Connected to MongoDB server.');
    }

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

function updateQuestion(id, newQuestion) {
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
            } else {
                console.log(res.value);
            }
        });
}

function updateAnswer(id, oldAnswer, newAnswer) {
    db.collection('qna').updateOne(
        { _id: new ObjectID(id), answer: oldAnswer },
        { $set: { 'answer.$': newAnswer } }
    )
    console.log(id, oldAnswer, newAnswer)
}

function addAnswer(id, answer) {
    db.collection('qna').updateOne(
        { _id: new ObjectID(id) },
        { $push: { answer: answer } }
    )
}

function deleteAnswer(id, answer) {
    db.collection('qna').updateOne(
        { _id: new ObjectID(id) },
        { $pull: { answer: answer } }
    )
}

//Timelog middleware that is specific to this route
// router.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now());
//     next();
// })

//Create questions
router.post('/q', (req, res) => {
    insertQuestion(req.body);
    res.json(req.body);
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

module.exports = router;