import { Empty, List, ListItem } from '_shared'
import RaisedButton from 'material-ui/RaisedButton'

const DoctorsList = ({ doctors, deleteDoctor }) => {
  const { loading, errors, data } = doctors
  if (loading) return (<div>Loading...</div>)
  else if (errors) return (<div>Errors...</div>)

  if (!data.length) return (<Empty type="doctors" />)
  return (
    <List>
      {data.map(item => (
        <ListItem
          key={item._id}
          item={item}
          type="_doctor"
          controls={
            <RaisedButton
              secondary
              label="Удалить врача"
              onClick={() => { deleteDoctor(item._doctor._id) }}
            />
          }
        />
      ))}
    </List>
  )
}

export default DoctorsList

DoctorsList.propTypes = {
  doctors: PropTypes.shape({}).isRequired,
  deleteDoctor: PropTypes.func.isRequired
}
