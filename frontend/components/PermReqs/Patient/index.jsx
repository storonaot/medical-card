import { Row, Col } from 'react-flexbox-grid'
import { Paper, Title, List, ListItem, PermReqControls } from '_shared'

const PatientPermReq = ({ requests, successReq, declineReq }) => (
  <Row>
    <Col md={12}>
      <Paper>
        <Title text="Запросы доступа" />
        <List>
          {requests.map(item => (
            <ListItem
              key={item._id}
              item={item}
              type="_from"
              controls={
                <PermReqControls
                  onSuccess={() => { successReq(item._id) }}
                  onDecline={() => { declineReq(item._id) }}
                />
              }
            />
          ))}
        </List>
      </Paper>
    </Col>
  </Row>
)

export default PatientPermReq

PatientPermReq.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  successReq: PropTypes.func.isRequired,
  declineReq: PropTypes.func.isRequired
}
