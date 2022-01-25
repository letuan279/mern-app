const express = require('express')
const router = express.Router()
const User = require('../models/User')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/auth')
require('dotenv').config()



// @Route: GET /api/auth
// @desc: Check if user is logged in
// @access: Public
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')

        if (!user) return res.status(400).json({ success: false, message: "User not found" })

        res.status(200).json({ success: true, user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Server error' })
    }
})


// @Route: POST /api/auth/register
// @desc: Register user
// @access: Public
router.post('/register', async (req, res) => {
    const { username, password } = req.body

    //Simple Validation
    if (!username || !password)
        return res.status(400).json({ success: false, message: 'Missing username and/or password and/or confirm password' })

    try {
        //Check for existing username
        const user = await User.findOne({ username })
        if (user) return res.status(400).json({ success: false, message: 'Username already taken' })

        //Hash password and create a new user
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({ username, password: hashedPassword })
        await newUser.save()

        //Create access token and return
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
        return res.status(200).json({ success: true, message: "Created a new user", accessToken })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Server error' })
    }
})

// @Route: POST /api/auth/login
// @desc: Login user
// @access: Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body

    //Simple Validation
    if (!username || !password)
        return res.status(400).json({ success: false, message: 'Missing username and/or password' })

    try {
        //Check for existing username and valid password
        const user = await User.findOne({ username })
        if (!user) return res.status(400).json({ success: false, message: 'Incorrect username or password' })

        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid) return res.status(400).json({ success: false, message: 'Incorrect username or password' })

        //Create access token and return
        const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET)
        return res.status(200).json({ success: true, message: "login successfully", accessToken })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Server error' })
    }
})

module.exports = router