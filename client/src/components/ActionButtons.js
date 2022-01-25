import Button from "react-bootstrap/esm/Button"
import playIcon from '../assets/play-btn.svg'
import editIcon from '../assets/pencil.svg'
import deleteIcon from '../assets/trash.svg'
import { CourseContext } from "../contexts/CourseContext"
import { useContext } from "react"



const ActionButtons = ({ url, _id }) => {

    const { deleteCourse, findCourseSelected, setShowUpdateCourseModal } = useContext(CourseContext)
    const handleDelete = async () => {
        await deleteCourse(_id)
    }
    const handleUpdate = () => {
        findCourseSelected(_id)
        setShowUpdateCourseModal(true)
    }

    return (
        <>
            <Button variant="outline-light" href={url} target='_blank'>
                <img src={playIcon} alt='play' width='16' height='16' />
            </Button>
            <Button variant="outline-light" onClick={handleUpdate}  >
                <img src={editIcon} alt='edit' width='16' height='16' />
            </Button>
            <Button variant="outline-light" onClick={handleDelete}  >
                <img src={deleteIcon} alt='delete' width='16' height='16' />
            </Button>
        </>
    )
}

export default ActionButtons
