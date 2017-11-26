import { Col } from 'react-flexbox-grid'
import { Paper, Title, Avatar } from '_shared'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import ActionCached from 'material-ui/svg-icons/action/cached'
import styles from '../styles'

const PersonalBlock = ({ patient, triggerForm, formShown, isDoctor, shownUpdateBtn, updateMedicalCard }) => {
  if (!patient) return null
  return (
    <Col xs={12} className={styles.block}>
      <Paper>
        <Title text="Медицинская карта пациента" />
        <div className={styles.personalInfoWrapper}>
          <div className={styles.personalInfo}>
            <Avatar photo={patient.photo} style={{ marginRight: '20px' }} />
            <div>
              <p>
                {patient.personalInfo.lastName} {patient.personalInfo.firstName}
              </p>
              <p>{patient.personalInfo.gender}</p>
            </div>
          </div>
          {isDoctor && (
            <FloatingActionButton
              onClick={triggerForm}
              secondary={formShown}
            >
              {formShown ? <ContentRemove /> : <ContentAdd />}
            </FloatingActionButton>
          )}
          {shownUpdateBtn && (
            <FloatingActionButton onClick={updateMedicalCard} >
              <ActionCached />
            </FloatingActionButton>
          )}
        </div>
      </Paper>
    </Col>
  )
}

export default PersonalBlock

PersonalBlock.defaultProps = {
  patient: null,
  formShown: false,
  triggerForm: () => {},
  isDoctor: false,
  shownUpdateBtn: false,
  updateMedicalCard: () => {}
}

PersonalBlock.propTypes = {
  patient: PropTypes.shape({}),
  formShown: PropTypes.bool,
  triggerForm: PropTypes.func,
  isDoctor: PropTypes.bool,
  shownUpdateBtn: PropTypes.bool,
  updateMedicalCard: PropTypes.func
}
