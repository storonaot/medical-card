import RaisedButton from 'material-ui/RaisedButton'

const GoToDashboardBtn = ({ path, push }) => {
  if (path !== '/' && path !== '/dashboard' && path !== '/auth') {
    return (
      <RaisedButton
        label="Панель управления"
        onClick={() => { push('/dashboard') }}
        style={{ alignSelf: 'flex-end', marginBottom: '20px' }}
      />
    )
  }
  return null
}

GoToDashboardBtn.propTypes = {
  path: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired
}

export default GoToDashboardBtn
