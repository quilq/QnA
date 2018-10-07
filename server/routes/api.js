const express = require('express');
const router = express.Router();
const {mongoose} = require('./../db/mongoose');
const { User } = require('./../models/user');
const { Question } = require('./../models/questions');

var { authenticate } = require('./../middleware/authenticate');

//Timelog middleware that is specific to this route
// router.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now());
//     next();
// })

//Create questions
router.post('/q', (req, res) => {
    Question.createQuestion(req, res);
});

//Find questions
router.get('/q/:id', (req, res) => {
    Question.findQuestionsByID(req, res);
});

//Fetch all questions
router.get('/q', (req, res) => {
    Question.getAllQuestions(req, res);
})

//Update question
router.put('/q', (req, res) => {
    Question.updateQuestion(req.body.id, req.body.newQuestion, res);
    // res.json('update');
});

//Delete question
router.delete('/q/:id', (req, res) => {
    Question.deleteQuestion(req.params.id, res);
    // res.json('delete');
});


//Add answer
router.put('/a/add', (req, res) => {
    Question.addAnswer(req.body.id, req.body.answer);
});

//Update answer 
router.put('/a/update', (req, res) => {
    Question.updateAnswer(req.body.id, req.body.oldAnswer, req.body.newAnswer);
});

//Update correct answer 
router.put('/a/update2', (req, res) => {
    Question.updateCorrectAnswer(req.body.id, req.body.i);
});

//Delete answer
router.put('/a/delete', (req, res) => {
    Question.deleteAnswer(req.body.id, req.body.answer);
});

//Get user info (private route)
router.get('/user/me', authenticate, (req, res) => {
    Question.findQuestionsByUser(req, res);
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
        res.status(200).send();
    } else {
        res.status(400).send();
    }
})

module.exports = router;