const hasEmptyValues = (obj) => {
  const empties = []
  _.forEach(obj, (value, key) => {
    if (value === null || value === '') empties.push(key)
  })

  return !!empties.length
}

const tmp = () => (true)

export { hasEmptyValues, tmp }
