import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { Paper } from '_shared'
import { Row, Col } from 'react-flexbox-grid'

const Form = ({
  isDoctor, data, updateValue, updateUser,
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
            disabled={disabledFields}
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
            <SelectField
              floatingLabelText="Frequency"
              value={data.gender}
              onChange={(event, index, value) => { updateValue('gender', value) }}
              disabled={disabledFields}
            >
              <MenuItem value="femail" primaryText="femail" />
              <MenuItem value="mail" primaryText="mail" />
            </SelectField>
          </Col>
        </Row>
        {specialisationField}
      </div>
      <RaisedButton
        secondary
        label={disabledFields ? 'Personal Info Saved' : 'Save Personal Info'}
        onClick={updateUser}
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
  updateUser: PropTypes.func.isRequired,
  disabledButton: PropTypes.bool.isRequired,
  disabledFields: PropTypes.bool.isRequired
}
