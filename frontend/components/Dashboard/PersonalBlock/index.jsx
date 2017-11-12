import { Paper, Title, Avatar } from '_shared'
import RaisedButton from 'material-ui/RaisedButton'
import styles from '../styles'

const PersonalBlock = ({ data, photo, isDoctor }) => {
  const medicalCardBtn = !isDoctor
    ? (
      <div style={{ textAlign: 'center', paddingTop: '20px' }}>
        <RaisedButton secondary label={'Show my medical card'} />
      </div>
    )
    : null

  return (
    <Paper>
      <Title text={isDoctor ? 'My Personal Info' : 'Medical Card'} />
      <div className={styles.personalInfo}>
        <Avatar photo={photo} style={{ marginRight: '20px' }} />
        <div>
          {data.map(item => (
            <p key={item.id} className={styles.name}>{item.title}: {item.value}</p>
          ))}
        </div>
      </div>
      {medicalCardBtn}
    </Paper>
  )
}

export default PersonalBlock

PersonalBlock.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  photo: PropTypes.string.isRequired,
  isDoctor: PropTypes.bool.isRequired
}
