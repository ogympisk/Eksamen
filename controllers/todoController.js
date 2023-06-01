const Todo = require('../models/Todo')
const mongoose = require('mongoose')




module.exports.todo_post = async (req, res) =>{
    const {title, text, createdBy} = req.body;

    try {
        const todo = await Todo.create({ title, text, createdBy});
        res.status(201).json({ todo })
    }
    catch(err){
        res.status(400).json({ errors });
    }
}


module.exports.get_todos = async (req, res) => {
    const {user} = req.params;

    try {
        const todos = await Todo.find({ createdBy: user });

        if(!todos) {
            res.render('todo', { todos: null });
        }

        res.render('todo', { todos });
    } catch (error) {
        res.redirect('/')
    }
}


module.exports.deleteTodo = async (req, res) =>{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json("invalid id")
    }

    const todo = await Todo.findOneAndDelete({_id: id});

    if(!todo) {
        return res.status(400).json({ error: "todo does not exist"})
    }
    res.status(200).json(todo)
}

