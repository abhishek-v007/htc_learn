const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    const { title, description, status, dueDate } = req.body;
    const userId = req.user.userId;
    try {
        const task = new Task({ title, description, status, dueDate, user: userId });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getTasks = async (req, res) => {
    const userId = req.user.userId;
    try {
        const tasks = await Task.find({ user: userId });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTaskById = async (req, res) => {
    const userId = req.user.userId;
    const taskId = req.params.id;
    try {
        const task = await Task.findOne({ _id: taskId, user: userId });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTask = async (req, res) => {
    const userId = req.user.userId;
    const taskId = req.params.id;
    const { title, description, status, dueDate } = req.body;
    try {
        const task = await Task.findOneAndUpdate(
            { _id: taskId, user: userId },
            { title, description, status, dueDate },
            { new: true }
        );
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteTask = async (req, res) => {
    const userId = req.user.userId;
    const taskId = req.params.id;
    try {
        const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};