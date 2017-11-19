import { Empty, List, ListItem } from '_shared'
import RaisedButton from 'material-ui/RaisedButton'

const PatientsList = ({ patients, goToSendPermReq, showMedicalCard }) => {
  const { loading, errors, data } = patients
  if (loading) return (<div>Loading...</div>)
  else if (errors) return (<div>Errors...</div>)

  if (!data.length) return (<Empty btnClick={goToSendPermReq} />)
  return (
    <List>
      {data.map(item => (
        <ListItem
          key={item._id}
          item={item}
          type="_patient"
          controls={
            <RaisedButton
              secondary
              label="Мед карта"
              onClick={() => { showMedicalCard(item._patient._id) }}
            />
          }
        />
      ))}
    </List>
  )
}

export default PatientsList

PatientsList.propTypes = {
  patients: PropTypes.shape({}).isRequired,
  goToSendPermReq: PropTypes.func.isRequired,
  showMedicalCard: PropTypes.func.isRequired
}
