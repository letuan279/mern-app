import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ActionButtons from './ActionButtons'
import Badge from 'react-bootstrap/Badge'


const SingleCourse = ({ course: { _id, url, status, description, title } }) => (
    <Card className='shadow border-2' border={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}>
        <Card.Body>
            <Card.Title>
                <Row>
                    <Col>
                        <h1 className='course-title'>{title}</h1>
                        <Badge pill bg={status === 'LEARNED' ? 'success' : status === 'LEARNING' ? 'warning' : 'danger'}>
                            {status}
                        </Badge>
                    </Col>

                    <Col className='text-right'>
                        <ActionButtons url={url} _id={_id} />
                    </Col>
                </Row>
            </Card.Title>
            <Card.Text>{description}</Card.Text>
        </Card.Body>
    </Card >
)

export default SingleCourse