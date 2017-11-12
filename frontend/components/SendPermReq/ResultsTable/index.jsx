import { Paper, Title, Avatar } from '_shared'
import { List, ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'

const ResultsTable = ({ result, sendPermission }) => {
  if (result === 'isEmpty') {
    return (
      <Paper>
        <Title text="Search result" />
        <p>Поиск не дал результатов</p>
      </Paper>
    )
  } else if (!result) return null

  const { personalInfo } = result
  const fullName = `${personalInfo.lastName} ${personalInfo.firstName}`
  return (
    <Paper>
      <Title text="Search result" />
      <List>
        <ListItem
          leftAvatar={<Avatar size="small" photo={result.photo} />}
          rightIcon={
            <RaisedButton
              style={{ width: 'auto' }}
              secondary
              label="Send request"
            />
          }
          primaryText={fullName}
          secondaryText={result.login}
          onClick={() => { sendPermission(result._id) }}
        />
      </List>
    </Paper>
  )
}

export default ResultsTable

ResultsTable.defaultProps = {
  result: null
}

ResultsTable.propTypes = {
  result: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({})
  ]),
  sendPermission: PropTypes.func.isRequired
}
