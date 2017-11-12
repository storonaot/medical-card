import { List, ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import { Avatar, Empty } from '_shared'

const PatientsList = ({ list, goToSendPermReq }) => {
  if (!list.length) return (<Empty btnClick={goToSendPermReq} />)
  return (
    <List>
      <ListItem
        leftAvatar={<Avatar size="small" photo="https://avatanplus.com/files/resources/mid/56f14fdc0d0351539e9ff395.png" />}
        rightIcon={<RaisedButton secondary label="More" />}
        primaryText="Irina Zhigalova"
        secondaryText="storonaot"
      />
    </List>
  )
}

export default PatientsList

PatientsList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  goToSendPermReq: PropTypes.func.isRequired
}