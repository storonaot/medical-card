import { Col } from 'react-flexbox-grid'
import classNames from 'classnames'
import { Paper } from '_shared'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ContentRemove from 'material-ui/svg-icons/content/remove'
import moment from 'moment'
import styles from '../styles'

const Record = ({ activeRecord, record, setActiveRecord }) => {
  const isActive = record.created === activeRecord
  const bodyClasses = classNames({
    [styles.recordBody]: true,
    [styles.isActive]: isActive
  })
  return (
    <Col xs={12} className={styles.block}>
      <Paper>
        <div className={styles.recordTop}>
          <div>
            <div>Доктор: <span className={styles.doc}>{record.doctor}</span></div>
            <div>Дата: {moment(record.created).locale('ru').format('LLLL')}</div>
          </div>
          <FloatingActionButton
            onClick={() => { setActiveRecord(record.created) }}
            secondary={isActive}
            mini
          >
            {isActive ? <ContentRemove /> : <ContentAdd />}
          </FloatingActionButton>
        </div>
        <div className={bodyClasses}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.tableRow}>
                <td className={styles.tableCol}>Диагноз:</td>
                <td className={styles.tableCol}>{record.diagnosis}</td>
              </tr>
              <tr className={styles.tableRow}>
                <td className={styles.tableCol}>Сопутствующий диагноз:</td>
                <td className={styles.tableCol}>{record.attendantDiagnosis}</td>
              </tr>
              <tr className={styles.tableRow}>
                <td className={styles.tableCol}>План обследования:</td>
                <td className={styles.tableCol}>{record.surveyPlan}</td>
              </tr>
              <tr className={styles.tableRow}>
                <td className={styles.tableCol}>Общие рекомендации:</td>
                <td className={styles.tableCol}>{record.generalRecommendations}</td>
              </tr>
              <tr className={styles.tableRow}>
                <td className={styles.tableCol}>Рекомендуемое лечение:</td>
                <td className={styles.tableCol}>{record.recommendedTherapy}</td>
              </tr>
              <tr className={styles.tableRow}>
                <td className={styles.tableCol}>Дополнительная информация:</td>
                <td className={styles.tableCol}>{record.additionalInformation}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Paper>
    </Col>
  )
}

export default Record

Record.defaultProps = {
  activeRecord: null
}

Record.propTypes = {
  record: PropTypes.shape({}).isRequired,
  activeRecord: PropTypes.number,
  setActiveRecord: PropTypes.func.isRequired
}
