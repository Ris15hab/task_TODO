const { createTask, getTask, updateTask, deleteTask } = require('../controllers/task')
const {verifyToken} = require('../middleware/auth')
const express = require('express')
const router = new express.Router()

router.post('/createTask',verifyToken,createTask)
router.get('/getTask',verifyToken,getTask)
router.put('/updateTask',verifyToken,updateTask)
router.delete('/deleteTask',verifyToken,deleteTask)

module.exports = router
