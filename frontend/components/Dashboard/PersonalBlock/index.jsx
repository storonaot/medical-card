import { Paper, Title, Avatar } from '_shared'
import RaisedButton from 'material-ui/RaisedButton'
import QRCode from 'qrcode-react'
import styles from '../styles'

const PersonalBlock = ({ data, photo, isDoctor, goToMedCard }) => {
  const ethAddr = data.length ? data[data.length - 1].value : null
  const medicalCardBtn = !isDoctor
    ? (
      <div style={{ textAlign: 'center', paddingTop: '20px' }}>
        <RaisedButton
          secondary
          label={'Подробнее'}
          onClick={goToMedCard}
        />
      </div>
    )
    : null

  return (
    <Paper>
      <Title text={isDoctor ? 'Персональная информация' : 'Моя медицинская карта'} />
      <div className={styles.personalInfo}>
        <div className={styles.avaWrapper}>
          <Avatar photo={photo} style={{ margin: '0 auto 20px' }} />
          {ethAddr && (<QRCode value={ethAddr} size={100} />)}
        </div>
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

PersonalBlock.defaultProps = {
  goToMedCard: () => {}
}

PersonalBlock.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  photo: PropTypes.string.isRequired,
  isDoctor: PropTypes.bool.isRequired,
  goToMedCard: PropTypes.func
}
