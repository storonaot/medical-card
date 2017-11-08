import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Paper } from '_shared'
import { Row, Col } from 'react-flexbox-grid'

const Form = ({
  isDoctor, data, updateValue, sendPersonalInfo,
  disabledButton, disabledFields
}) => {
  const specialisationField = isDoctor
    ? (
      <Row>
        <Col xs={12} sm={10} md={6}>
          <TextField
            floatingLabelText="Specialisation"
            fullWidth
            onChange={(e) => { updateValue('specialisation', e.target.value) }}
            value={data.specialisation}
          />
        </Col>
      </Row>
    ) : null

  return (
    <Paper>
      <div style={{ marginBottom: '20px' }}>
        <div>Personal Info</div>
        <Row>
          <Col xs={12} sm={4} md={4}>
            <TextField
              floatingLabelText="First Name"
              fullWidth
              onChange={(e) => { updateValue('firstName', e.target.value) }}
              value={data.firstName}
              disabled={disabledFields}
            />
          </Col>
          <Col xs={12} sm={4} md={4}>
            <TextField
              floatingLabelText="Last Name"
              fullWidth
              onChange={(e) => { updateValue('lastName', e.target.value) }}
              value={data.lastName}
              disabled={disabledFields}
            />
          </Col>
          <Col xs={12} sm={4} md={4}>
            <TextField
              floatingLabelText="Gender"
              fullWidth
              onChange={(e) => { updateValue('gender', e.target.value) }}
              value={data.gender}
              disabled={disabledFields}
            />
          </Col>
        </Row>
        {specialisationField}
      </div>
      <RaisedButton
        secondary
        label={disabledFields ? 'Personal Info Saved' : 'Save Personal Info'}
        onClick={sendPersonalInfo}
        disabled={disabledButton || disabledFields}
      />
    </Paper>
  )
}

export default Form

Form.propTypes = {
  isDoctor: PropTypes.bool.isRequired,
  data: PropTypes.shape({}).isRequired,
  updateValue: PropTypes.func.isRequired,
  sendPersonalInfo: PropTypes.func.isRequired,
  disabledButton: PropTypes.bool.isRequired,
  disabledFields: PropTypes.bool.isRequired
}
