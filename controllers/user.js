const Models = require('../utils/AllModels')
const { createError } = require('../middleware/error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const user = await Models.user.create({
            name,
            email,
            password
        })
        res.status(201).json({ messgae: "user registered successfully!", userData: user })
    } catch (err) {
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const userData = await Models.user.findOne({
            where: {
                email
            }
        })
        if (userData) {
            const isMatch = await bcrypt.compare(password, userData.password)
            if (isMatch) {
                const token = jwt.sign({ userData }, process.env.SECRET_KEY)
                res.status(200).json({ userData, token })
            } else {
                return next(createError(400, "invalid user credentials"))
            }
        } else {
            return next(createError(400, "invalid user credentials"))
        }
    } catch (err) {

    }
}

module.exports = {
    register,
    login
}