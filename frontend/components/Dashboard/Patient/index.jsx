import { Paper, Title } from '_shared'
import { Row, Col } from 'react-flexbox-grid'
import PersonalBlock from '../PersonalBlock'
import PermReqList from './PermReqList'

const PatientDashboard = ({ user, requests, showAll, successReq, declineReq }) => {
  const userData = [
    { id: 1, title: 'Login', value: user.login },
    { id: 2, title: 'First Name', value: user.personalInfo.firstName },
    { id: 3, title: 'Last Name', value: user.personalInfo.lastName },
    { id: 4, title: 'Gender', value: user.personalInfo.gender },
    { id: 5, title: 'Email', value: user.email },
    { id: 6, title: 'EthAddress', value: user.ethAddress }
  ]
  return (
    <Row>
      <Col md={6}>
        <PersonalBlock
          data={userData}
          photo={user.photo}
          isDoctor={user.isDoctor}
        />
      </Col>
      <Col md={6}>
        <Row>
          <Col md={12} style={{ marginBottom: '1rem' }}>
            <Paper><Title text="Мои доктора" /></Paper>
          </Col>
          <Col md={12}>
            <Paper>
              <Title text="Запросы доступа" />
              <PermReqList
                list={requests}
                showAll={showAll}
                successReq={successReq}
                declineReq={declineReq}
              />
            </Paper>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default PatientDashboard

PatientDashboard.propTypes = {
  user: PropTypes.shape({}).isRequired,
  showAll: PropTypes.func.isRequired,
  successReq: PropTypes.func.isRequired,
  declineReq: PropTypes.func.isRequired
}
