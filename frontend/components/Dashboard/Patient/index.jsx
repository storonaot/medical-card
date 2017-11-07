import { Paper, Title } from '_shared'
import { Row, Col } from 'react-flexbox-grid'
// import styles from '../styles'

const PatientDashboard = ({ user }) => {
  console.log('user', user)
  return (
    <Row>
      <Col md={6}>
        <Paper><Title text="Medical Card" /></Paper>
      </Col>
      <Col md={6}>
        <Row>
          <Col md={12} style={{ marginBottom: '1rem' }}>
            <Paper><Title text="My Doctors" /></Paper>
          </Col>
          <Col md={12}>
            <Paper><Title text="Permissoin Requests" /></Paper>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default PatientDashboard

PatientDashboard.propTypes = {
  user: PropTypes.shape({}).isRequired
}
