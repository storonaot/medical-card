import { Row, Col } from 'react-flexbox-grid'
import { Overlay } from '_shared'
import PersonalBlock from '../PersonalBlock'
import Form from '../Form'
import MedicalRecords from '../MedicalRecords'
import styles from '../styles'

const Doctor = ({
  medicalCard, setActiveRecord, activeRecord,
  patient, triggerForm, formShown, newRecord,
  updateRecord, addRecord, addingRecord, overlayContent
}) => (
  <div>
    <Row className={styles.block}>
      <PersonalBlock
        patient={patient}
        triggerForm={triggerForm}
        formShown={formShown}
        isDoctor
      />
      {formShown && (
        <Col xs={12} className={styles.block}>
          <Form
            record={newRecord}
            updateValue={updateRecord}
            addRecord={addRecord}
          />
        </Col>
      )}
    </Row>
    <MedicalRecords
      medicalCard={medicalCard}
      setActiveRecord={setActiveRecord}
      activeRecord={activeRecord}
    />
    <Overlay
      isActive={addingRecord}
      content={overlayContent}
    />
  </div>
)

export default Doctor

Doctor.defaultProps = {
  medicalCard: null,
  activeRecord: null,
  patient: null
}

Doctor.propTypes = {
  medicalCard: PropTypes.arrayOf(PropTypes.shape({})),
  setActiveRecord: PropTypes.func.isRequired,
  activeRecord: PropTypes.number,
  patient: PropTypes.shape({}),
  triggerForm: PropTypes.func.isRequired,
  formShown: PropTypes.bool.isRequired,
  newRecord: PropTypes.shape({}).isRequired,
  updateRecord: PropTypes.func.isRequired,
  addRecord: PropTypes.func.isRequired,
  overlayContent: PropTypes.string.isRequired,
  addingRecord: PropTypes.bool.isRequired
}
