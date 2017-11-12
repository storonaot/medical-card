import { Row, Col } from 'react-flexbox-grid'
import { Paper, Title } from '_shared'
import PersonalBlock from '../PersonalBlock'
import PatientsList from './PatientsList'
import PermReqList from './PermReqList'

const DoctorDashboard = ({ user, goToSendPermReq, requests, showAll, deleteRequest }) => {
  const userData = [
    { id: 1, title: 'Login', value: user.login },
    { id: 2, title: 'First Name', value: user.personalInfo.firstName },
    { id: 3, title: 'Last Name', value: user.personalInfo.lastName },
    { id: 4, title: 'Gender', value: user.personalInfo.gender },
    { id: 5, title: 'Email', value: user.email },
    { id: 6, title: 'Specialisation', value: user.personalInfo.specialisation },
    { id: 7, title: 'EthAddress', value: user.ethAddress }
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
            <Paper>
              <Title text="Мои пациенты" />
              <PatientsList
                list={[]}
                goToSendPermReq={goToSendPermReq}
              />
            </Paper>
          </Col>
          <Col md={12}>
            <Paper>
              <Title text="Запросы доступа" />
              <PermReqList
                list={requests}
                goToSendPermReq={goToSendPermReq}
                showAll={showAll}
                deleteRequest={deleteRequest}
              />
            </Paper>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default DoctorDashboard

DoctorDashboard.propTypes = {
  user: PropTypes.shape({}).isRequired,
  goToSendPermReq: PropTypes.func.isRequired,
  requests: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showAll: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired
}
