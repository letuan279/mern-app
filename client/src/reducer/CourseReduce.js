export const CourseReduce = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case 'GET_COURSES_SUCCESS':
            return {
                ...state,
                courseLoading: false,
                courseList: payload
            }
        case 'GET_COURSES_FAIL':
            return {
                ...state,
                courseLoading: false,
                courseList: []
            }
        case 'CREATED_NEW_COURSE':
            return {
                ...state,
                courseLoading: false,
                courseList: [...state.courseList, payload]
            }
        case 'DELETE_COURSE':
            return {
                ...state,
                courseLoading: false,
                courseList: state.courseList.filter(course => course._id !== payload._id)
            }
        case 'UPDATE_COURSE':
            const newCourseList = state.courseList.map(course => course._id === payload._id ? payload : course)
            return {
                ...state,
                courseLoading: false,
                courseList: newCourseList
            }
        default:
            return state
    }
}