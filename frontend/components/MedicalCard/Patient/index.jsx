import PersonalBlock from '../PersonalBlock'
import MedicalRecords from '../MedicalRecords'

const Patient = ({ medicalCard, setActiveRecord, activeRecord, patient, shownUpdateBtn, updateMedicalCard }) => (
  <div>
    <PersonalBlock
      patient={patient}
      isDoctor={false}
      shownUpdateBtn={shownUpdateBtn}
      updateMedicalCard={updateMedicalCard}
    />
    <MedicalRecords
      medicalCard={medicalCard}
      setActiveRecord={setActiveRecord}
      activeRecord={activeRecord}
    />
  </div>
)

export default Patient

Patient.defaultProps = {
  medicalCard: null,
  activeRecord: null,
  patient: null
}

Patient.propTypes = {
  medicalCard: PropTypes.arrayOf(PropTypes.shape({})),
  setActiveRecord: PropTypes.func.isRequired,
  activeRecord: PropTypes.number,
  patient: PropTypes.shape({}),
  shownUpdateBtn: PropTypes.bool.isRequired,
  updateMedicalCard: PropTypes.func.isRequired
}
