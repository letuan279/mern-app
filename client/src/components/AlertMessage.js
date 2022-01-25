import Alert from 'react-bootstrap/Alert'


const AlertMessage = ({ info }) => {

    let style = {
        position: "fixed",
        bottom: "10px",
        right: '80px',
        minWidth: '300px'
    }

    return !info ? null : (
        <Alert style={style} variant={info.type}>
            <Alert.Heading>{info.type.charAt(0).toUpperCase() + info.type.slice(1)}</Alert.Heading>
            <p>
                {info.message}
            </p>
        </Alert>
    )
}

export default AlertMessage
