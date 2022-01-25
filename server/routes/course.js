const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Course = require('../models/Course')


// @route GET /api/courses
// @desc get courses make by a user
// @access Private
router.get('/', verifyToken, async (req, res) => {
    try {
        const courses = await Course.find({ user: req.userId }).populate('user', ['username'])
        res.status(200).json({ success: true, courses })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Server error' })
    }
})


// @route POST /api/courses
// @desc create a course
// @access Private
router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body

    if (!title) return res.status(400).json({ success: false, message: "Title is required" })

    try {
        const newCourse = new Course({
            title,
            description,
            url: url ? (url.startsWith('https://') ? url : `https://${url}`) : '',
            status: status || 'TO LEARN',
            user: req.userId
        })

        await newCourse.save()
        res.json({ success: true, message: 'Created a new course', course: newCourse })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Server error' })
    }
})

// @route PUT /api/courses
// @desc update a courses make by a user
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body

    if (!title) return res.status(400).json({ success: false, message: "Title is required" })

    let updatedCourse = {
        title,
        description: description || '',
        url: url ? (url.startsWith('https://') ? url : `https://${url}`) : '',
        status: status || 'TO LEARN'
    }

    try {
        const updateCourseConditional = { _id: req.params.id, user: req.userId }
        updatedCourse = await Course.findOneAndUpdate(updateCourseConditional, updatedCourse, { new: true })

        // Course not found of user not authorized to update
        if (!updatedCourse) return res.status(401).json({ success: false, message: "Course not found of user not authorized" })

        res.status(200).json({ success: true, message: "Update course successfully", course: updatedCourse })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Server error' })
    }
})


// @route DELETE /api/courses
// @desc delete a courses make by a user
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {

    try {
        const deleteCourseConditional = { _id: req.params.id, user: req.userId }
        const deleteCourse = await Course.findOneAndDelete(deleteCourseConditional, { new: true })

        // Course not found of user not authorized to update
        if (!deleteCourse) return res.status(401).json({ success: false, message: "Course not found of user not authorized" })

        res.status(200).json({ success: true, message: "Delete course successfully", course: deleteCourse })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Server error' })
    }

})


module.exports = router