const Models = require('../utils/AllModels')
const { createError } = require('../middleware/error')

const createTask = async (req, res, next) => {
    try {
        const { description, status, due_date } = req.body
        const task = await Models.task.create({
            description,
            status,
            due_date: new Date(due_date),
            userId: req.user.userData.id
        })
        res.status(201).json({ message: "new task added!", task })
    } catch (err) {
        next(err)
    }
}

const getTask = async (req, res, next) => {
    try {
        const taskData = await Models.task.findAll({
            where: {
                userId: req.user.userData.id
            }
        })
        res.status(200).json({ taskData })
    } catch (err) {
        next(err)
    }
}

const updateTask = async (req, res, next) => {
    try {
        const { id, description, status, due_date } = req.body
        const task = await Models.task.update({
            description,
            status,
            due_date: new Date(due_date),
        }, {
            where: {
                id
            }
        })
        res.status(200).json({ message: "Task upadated" })
    } catch (err) {
        next(err)
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.query
        await Models.task.destroy({
            where: {
                id
            }
        })
        res.status(200).json({ message: "task deleted" })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createTask,
    getTask,
    updateTask,
    deleteTask
}