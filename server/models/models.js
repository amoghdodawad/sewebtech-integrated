const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : false,
        default : 'faculty'
    }
});

const Users = new model('users',userSchema);

module.exports = {
    Users
}