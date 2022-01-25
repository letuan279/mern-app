import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { CourseContext } from '../contexts/CourseContext'
import { useContext, useState } from 'react'
import AlertMessage from './AlertMessage'

const AddCourseModal = () => {

    const { showCourseModal, setShowCourseModal, createCourse } = useContext(CourseContext)
    const [form, setForm] = useState({
        title: '',
        description: '',
        url: '',
        status: 'TO LEARN'
    })
    const [alert, setAlert] = useState(null)

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const closeDialog = () => {
        setForm({
            title: '',
            description: '',
            url: '',
            status: 'TO LEARN'
        })
        setShowCourseModal(false)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!form.title) {
            setAlert({
                type: 'warning',
                message: "title is required"
            })
            setTimeout(() => setAlert(null), 3000)
        } else if (form.title.length > 10) {
            setAlert({
                type: 'warning',
                message: "Nhập title <= 10 ký tự thôi cho giao diện nó đẹp"
            })
            setTimeout(() => setAlert(null), 3000)
        }
        else {
            try {
                const { success, message } = await createCourse(form)
                if (!success) {
                    setAlert({
                        type: 'warning',
                        message
                    })
                    setTimeout(() => setAlert(null), 3000)
                } else {
                    setAlert({
                        type: 'success',
                        message
                    })
                    setTimeout(() => setAlert(null), 3000)
                }
            } catch (error) {
                console.log(error)
            }
        }

        closeDialog()
    }

    return (
        <>
            <Modal show={showCourseModal} onHide={closeDialog}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Control value={form.title} onChange={onChange} type="text" placeholder="Title" name='title' required aria-describedby='title-help' isInvalid={!form.title} />
                            <Form.Text id='title-help'>{form.title ? `` : `Please fill out this field`}</Form.Text>
                            <Form.Text id='title-help'>{form.title.length > 10 ? `Nhập title <= 10 ký tự thôi cho giao diện nó đẹp` : ``}</Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control value={form.description} onChange={onChange} as="textarea" rows={3} placeholder="Description" name='description' />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control value={form.url} onChange={onChange} type="text" placeholder="Link" name='url' />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select value={form.status} onChange={onChange} name='status'>
                                <option value="TO LEARN">TO LEARN</option>
                                <option value="LEARNING">LEARNING</option>
                                <option value="LEARNED">LEARNED</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={closeDialog} variant="secondary" >
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} variant="primary" >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal >
            <AlertMessage info={alert} />
        </>
    )
}

export default AddCourseModal