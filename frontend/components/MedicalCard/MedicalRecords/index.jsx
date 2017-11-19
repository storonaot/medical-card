import { Col } from 'react-flexbox-grid'
import { Paper } from '_shared'

const MedicalRecords = ({ medicalCard }) => {
  if (medicalCard) {
    return (
      <Col xs={12}>
        <Paper>Not Empty</Paper>
      </Col>
    )
  }

  return (
    <Col xs={12}>
      <Paper>Is Empty</Paper>
    </Col>
  )
}

export default MedicalRecords

MedicalRecords.defaultProps = {
  medicalCard: null
}

MedicalRecords.propTypes = {
  medicalCard: PropTypes.arrayOf(PropTypes.shape({}))
}
