import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { Row, Col } from 'react-flexbox-grid'
import { Paper, Title } from '_shared'

const style = { width: '100%' }

const Form = ({ record, updateValue, addRecord, addingRecord }) => (
  <Paper>
    <Title text="Консультативное заключение" />
    <Row style={{ marginBottom: '20px' }}>
      <Col xs={6}>
        <TextField
          style={style}
          hintText="Диагноз"
          floatingLabelText="Диагноз"
          multiLine
          rows={2}
          onChange={(e) => { updateValue('diagnosis', e.target.value) }}
          value={record.diagnosis}
        />
      </Col>
      <Col xs={6}>
        <TextField
          style={style}
          hintText="Сопутствующий диагноз"
          floatingLabelText="Сопутствующий диагноз"
          multiLine
          rows={2}
          onChange={(e) => { updateValue('attendantDiagnosis', e.target.value) }}
          value={record.attendantDiagnosis}
        />
      </Col>
      <Col xs={6}>
        <TextField
          style={style}
          hintText="План обследования"
          floatingLabelText="План обследования"
          multiLine
          rows={3}
          onChange={(e) => { updateValue('surveyPlan', e.target.value) }}
          value={record.surveyPlan}
        />
      </Col>
      <Col xs={6}>
        <TextField
          style={style}
          hintText="Общие рекомендации"
          floatingLabelText="Общие рекомендации"
          multiLine
          rows={3}
          onChange={(e) => { updateValue('generalRecommendations', e.target.value) }}
          value={record.generalRecommendations}
        />
      </Col>
      <Col xs={6}>
        <TextField
          style={style}
          hintText="Рекомендуемое лечение"
          floatingLabelText="Рекомендуемое лечение"
          multiLine
          rows={3}
          onChange={(e) => { updateValue('recommendedTherapy', e.target.value) }}
          value={record.recommendedTherapy}
        />
      </Col>
      <Col xs={6}>
        <TextField
          style={style}
          hintText="Дополнительная информация"
          floatingLabelText="Дополнительная информация"
          multiLine
          rows={3}
          onChange={(e) => { updateValue('additionalInformation', e.target.value) }}
          value={record.additionalInformation}
        />
      </Col>
    </Row>
    <div style={{ textAlign: 'center' }}>
      <RaisedButton
        secondary
        label="Добавить запись"
        onClick={addRecord}
      />
    </div>
  </Paper>
)

export default Form

Form.propTypes = {
  record: PropTypes.shape({}).isRequired,
  updateValue: PropTypes.func.isRequired,
  addRecord: PropTypes.func.isRequired
}
