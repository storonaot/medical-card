import { Paper, Title, Avatar } from '_shared'
import styles from '../styles'

const PersonalBlock = ({ data, photo, isDoctor }) => (
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
  </Paper>
)

export default PersonalBlock

PersonalBlock.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  photo: PropTypes.string.isRequired,
  isDoctor: PropTypes.bool.isRequired
}
