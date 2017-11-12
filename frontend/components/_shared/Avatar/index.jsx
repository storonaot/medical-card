import styles from './styles'

const Avatar = ({ size, photo, style }) => {
  const intSize = size === 'regular' ? 100 : 40
  const styleDefault = {
    width: intSize,
    minWidth: intSize,
    height: intSize,
    backgroundImage: `url(${photo})`
  }

  return (
    <div
      className={styles.avatar}
      style={{ ...styleDefault, ...style }}
    />
  )
}

export default Avatar

Avatar.defaultProps = {
  size: 'regular',
  style: null
}

Avatar.propTypes = {
  size: PropTypes.oneOf(['small', 'regular']),
  photo: PropTypes.string.isRequired,
  style: PropTypes.shape({})
}
