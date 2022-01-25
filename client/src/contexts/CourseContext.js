import { createContext, useReducer, useState } from "react"
import axios from 'axios'
import { apiURL } from './constants'
import { CourseReduce } from '../reducer/CourseReduce'

export const CourseContext = createContext()

const CourseContextProvider = ({ children }) => {

    const [courseState, dispatch] = useReducer(CourseReduce, {
        courseLoading: true,
        courseList: []
    })

    const [showCourseModal, setShowCourseModal] = useState(false)
    const [showUpdateCourseModal, setShowUpdateCourseModal] = useState(false)
    const [courseSelected, setCourseSelected] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    })

    // Get course
    const getCourse = async () => {
        try {
            const response = await axios.get(`${apiURL}/courses`)
            if (response.data.success) {
                dispatch({
                    type: "GET_COURSES_SUCCESS",
                    payload: response.data.courses
                })
            }

        } catch (error) {
            dispatch({ type: "GET_COURSES_FAIL" })
        }
    }

    //Create new course
    const createCourse = async (form) => {
        try {
            const response = await axios.post(`${apiURL}/courses`, form)
            if (response.data.success) {
                dispatch({
                    type: "CREATED_NEW_COURSE",
                    payload: response.data.course
                })
            }

            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            return { success: false, message: error.message }
        }
    }

    //delete course
    const deleteCourse = async (id) => {
        try {
            const response = await axios.delete(`${apiURL}/courses/${id}`)
            if (response.data.success) {
                dispatch({
                    type: "DELETE_COURSE",
                    payload: response.data.course
                })
            }
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    //update course
    const updateCourse = async (form, id) => {
        try {
            const response = await axios.put(`${apiURL}/courses/${id}`, form)
            if (response.data.success) {
                dispatch({
                    type: "UPDATE_COURSE",
                    payload: response.data.course
                })
            }
            return response.data
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: error.message }
        }
    }

    // Find the course user want to change
    const findCourseSelected = courseId => {
        const foundCourse = courseState.courseList.find((course) => course._id === courseId)
        setCourseSelected(foundCourse)
    }
    // Refresh the found course
    const refreshFoundCourse = () => {
        setCourseSelected({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN'
        })
    }


    // context data
    const courseContextData = {
        courseState,
        getCourse,
        showCourseModal,
        setShowCourseModal,
        createCourse,
        deleteCourse,
        updateCourse,
        courseSelected,
        findCourseSelected,
        refreshFoundCourse,
        showUpdateCourseModal,
        setShowUpdateCourseModal,
        setCourseSelected
    }

    return (
        <CourseContext.Provider value={courseContextData}>
            {children}
        </CourseContext.Provider>
    )
}


export default CourseContextProvider