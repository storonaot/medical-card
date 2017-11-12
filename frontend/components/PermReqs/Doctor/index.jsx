import RaisedButton from 'material-ui/RaisedButton'
import { Row, Col } from 'react-flexbox-grid'
import { Paper, Title, List, ListItem } from '_shared'
import styles from '../styles'

const DoctorPermReq = ({ router, requests, deleteRequest }) => (
  <Row>
    <Col md={12}>
      <Paper>
        <div className={styles.top}>
          <Title text="Запросы доступа" marginBottom={false} />
          <RaisedButton
            secondary
            label="Отправить запрос"
            onClick={() => { router.push('send-perm-req') }}
          />
        </div>
        <List>
          {requests.map(item => (
            <ListItem
              deleteItem={deleteRequest}
              key={item._id}
              item={item}
            />
          ))}
        </List>
      </Paper>
    </Col>
  </Row>
)

export default DoctorPermReq

DoctorPermReq.propTypes = {
  router: PropTypes.shape({}).isRequired,
  requests: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  deleteRequest: PropTypes.func.isRequired
}
