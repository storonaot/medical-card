import { Paper } from '_shared'
import { Row, Col } from 'react-flexbox-grid'
import Record from '../Record'
import styles from '../styles'

const MedicalRecords = ({ medicalCard, setActiveRecord, activeRecord }) => {
  const medCard = medicalCard || []
  const sortedRecords = medCard.sort((a, b) => {
    if (a.created < b.created) return 1
    else if (a.created > b.created) return -1
    return 0
  })
  return (
    <Row className={styles.block}>
      {!medCard.length && (
        <Col xs={12}>
          <Paper>В данной карте пока нет записей</Paper>
        </Col>
      )}
      {sortedRecords.map(record => (
        <Record
          key={record.created}
          record={record}
          setActiveRecord={setActiveRecord}
          activeRecord={activeRecord}
        />
      ))}
    </Row>
  )
}

export default MedicalRecords

MedicalRecords.defaultProps = {
  medicalCard: null,
  activeRecord: null
}

MedicalRecords.propTypes = {
  medicalCard: PropTypes.arrayOf(PropTypes.shape({})),
  setActiveRecord: PropTypes.func.isRequired,
  activeRecord: PropTypes.number
}
