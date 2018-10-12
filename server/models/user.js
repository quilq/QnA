const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { mongoose } = require('./../db/mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    }
});

//Hash password before saving
UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(12, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

//Generate token with instance method
UserSchema.methods.generateAuthToken = function () {
    //Avoid arrow function for 'this' keyword
    var user = this;
    var access = 'auth';

    var token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET, {expiresIn: '1d'}).toString();
    return Promise.resolve(token);
}

//Find user with model method
UserSchema.statics.findByCredentials = function (email, password) {
    var User = this; //Uppercase for model method

    //Find user
    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        //Return User if password is correct
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
}

UserSchema.statics.findByToken = function(token){
    var User = this;
    var decoded;
    
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET);

    } catch(e){
        return Promise.reject(e);
    }

    return User.findOne({
        _id: decoded._id,
    });
}

//Modify object sent back to user (only send id & email)
UserSchema.methods.toJSON = function(){
    var user = this;

    //Convert mongo object to regular object
    var userObject = user.toObject();
    return {_id: userObject._id, email: userObject.email, username: userObject.username}
}

var User = mongoose.model('User', UserSchema);

module.exports = { User };
