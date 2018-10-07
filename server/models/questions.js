const { mongoose } = require('./../db/mongoose');
const ObjectID = require('mongodb').ObjectID;

var QuestionSchema = new mongoose.Schema({
    tag: String,
    question: String,
    askedByUser: String,
    answers: [{
        answer: String,
        isCorrectAnswer: Boolean,
        answeredByUser: String
    }]
});

// var AnswerSchema = new mongoose.Schema({
//     answer: String,
//     isCorrectAnswer: Boolean,
//     answeredByUser: String
// })

//Find questions by user with model method
QuestionSchema.statics.findQuestionsByUser = function (req, res) {
    var Question = this;
    let user = req.user;
    let userQuestions;
    let userAnswers;

    Question.find({ askedByUser: user.username }).then(docs => {
        userQuestions = docs;
        Question.find(
            {
                answers: {
                    $elemMatch: {
                        answeredByUser: user.username
                    }
                }
            }).then(docs => {
                userAnswers = docs;
                res.json({ user, userQuestions, userAnswers });
            });
    });
}

QuestionSchema.statics.findQuestionsByID = function (req, res) {
    var Question = this;
    Question.findById({ _id: new ObjectID(req.params.id) }, (error, doc) => {
        if (error) {
            console.log('Unable to fetch data ', error);
        } else {
            res.json(doc);
        }
    })
}

QuestionSchema.statics.getAllQuestions = function (req, res) {
    var Question = this;
    Question.find((error, doc) => {
        if (error) {
            console.log('Unable to fetch data ', error);
        } else {
            res.status(200).json(doc);
        }
    });
}

QuestionSchema.statics.createQuestion = function (req, res) {
    var Question = this;

    Question.create(req.body, (error, result) => {
        if (error) {
            console.log('Cannot insert document');
        }
        res.status(200).send(result);
    });
}

QuestionSchema.statics.updateQuestion = function (id, newQuestion, res) {
    var Question = this;

    Question.findOneAndUpdate({
        //filter
        _id: new ObjectID(id)
    }, {
            //update
            $set: { question: newQuestion }
        }, {
            //option
            returnOriginal: false
        }, (error, result) => {
            if (error) {
                console.log(error);
            };
            res.status(200).send(result);
        });

}

QuestionSchema.statics.deleteQuestion = function (id, res) {
    var Question = this;

    Question.findOneAndDelete({ _id: new ObjectID(id) }, (error, result) => {
        if (error) {
            console.log(error);
        };
        res.status(200).send(result);
    });
}

QuestionSchema.statics.addAnswer = function (id, answer) {
    var Question = this;

    Question.updateOne(
        { _id: new ObjectID(id) },
        //Push answer to answers array
        { $push: { answers: answer } },
        (error, result) => {
            if (error) {
                console.log(error);
            }
        }
    )
}

QuestionSchema.statics.deleteAnswer = function (id, answer) {
    var Question = this;

    Question.updateOne(
        { _id: new ObjectID(id) },
        { $pull: { answers: { answer: answer.answer } } },
        (error, result) => {
            if (error) {
                console.log(error);
            }
        }
    )
}

QuestionSchema.statics.updateAnswer = function (id, oldAnswer, newAnswer) {
    var Question = this;

    Question.updateOne(
        { _id: new ObjectID(id) },
        { $set: { 'answers.$[element].answer': newAnswer.answer } },
        //Filter answers array to update
        { arrayFilters: [{ "element.answer": oldAnswer.answer }] },
        (error, result) => {
            if (error) {
                console.log(error);
            }
        }
    )
}

QuestionSchema.statics.updateCorrectAnswer = function (id, i) {
    var Question = this;

    Question.updateOne(
        { _id: new ObjectID(id), 'answers.isCorrectAnswer': true },
        { $set: { 'answers.$.isCorrectAnswer': false } },
        (error, result) => {
            if (error) {
                console.log(error);
            }
        }
    )

    setObject = {};
    setObject['answers.'+i+'.isCorrectAnswer'] = true;
    Question.updateOne(
        { _id: new ObjectID(id) },
        {
            $set: setObject
        },
        (error, result) => {
            if (error) {
                console.log(error);
            }
        }
    )
}


var Question = mongoose.model('Question', QuestionSchema);

module.exports = { Question };