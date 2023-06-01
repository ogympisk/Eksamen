const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    text: {
        type: String,
        required:true
    },
    createdBy:{
        type: String,
        required:true
    }
});

const Todo = mongoose.model('todo', userSchema)


module.exports = Todo;