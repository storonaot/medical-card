import IconButton from 'material-ui/IconButton'
import ContentRemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline'
import ContentAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline'

const PermReqControls = ({ onSuccess, onDecline }) => (
  <div>
    <IconButton
      onClick={onSuccess}
      tooltip="Принять"
      tooltipPosition="top-center"
    >
      <ContentAddCircleOutline color="#00968e" />
    </IconButton>
    <IconButton
      onClick={onDecline}
      tooltip="Отклонить"
      tooltipPosition="top-center"
    >
      <ContentRemoveCircleOutline color="#ff9800" />
    </IconButton>
  </div>
)

export default PermReqControls

PermReqControls.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired
}
