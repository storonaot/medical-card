import TextField from 'material-ui/TextField'
import { Col } from 'react-flexbox-grid'
import RaisedButton from 'material-ui/RaisedButton'
import { Paper } from '_shared'

const Form = ({ opened, record, updateValue, addRecord }) => {
  if (opened) {
    return (
      <Col xs={12}>
        <Paper>
          <TextField
            hintText="Диагноз"
            floatingLabelText="Диагноз"
            multiLine
            rows={2}
            onChange={(e) => { updateValue('diagnosis', e.target.value) }}
            value={record.diagnosis}
          />
          <RaisedButton
            secondary
            label="Добавить запись"
            onClick={addRecord}
          />
        </Paper>
      </Col>
    )
  }
  return null
}

export default Form

Form.propTypes = {
  opened: PropTypes.bool.isRequired,
  record: PropTypes.shape({}).isRequired,
  updateValue: PropTypes.func.isRequired,
  addRecord: PropTypes.func.isRequired
}
