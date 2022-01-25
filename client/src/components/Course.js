import { useContext, useEffect } from "react"
import { CourseContext } from "../contexts/CourseContext"
import Spinner from "react-bootstrap/Spinner"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SingleCourse from './SingleCourse'
import Button from "react-bootstrap/Button"
import AddCourseModal from './AddCourseModal'
import UpdateCourseModal from './UpdateCourseModal'



const Course = () => {
    const { getCourse, courseState, setShowCourseModal } = useContext(CourseContext)

    const { courseLoading, courseList } = courseState

    useEffect(() => getCourse(), [])

    let body
    if (courseLoading) {
        body = (
            <>
                <Spinner animation="border" variant="info" />
            </>
        )
    } else if (courseList.length === 0) {
        body = (
            <div className="mt-5" style={{ textAlign: 'center' }}>
                <h3 className="mt-3">Click to create your first course</h3>
                <Button onClick={() => setShowCourseModal(true)} className="mt-3" variant="primary">Create</Button>
            </div>
        )
    } else {
        body = (
            <>
                <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
                    {courseList.map((course, index) => (
                        <Col key={index} className="my-2">
                            <SingleCourse course={course} />
                        </Col>
                    ))}
                </Row>

                <Button onClick={() => setShowCourseModal(true)} className="position-fixed" style={{ right: '30px', bottom: '30px', borderRadius: '50%' }}>
                    +
                </Button>
            </>
        )
    }

    return (
        <>
            {body}
            <AddCourseModal />
            <UpdateCourseModal />
        </>
    )
};

export default Course