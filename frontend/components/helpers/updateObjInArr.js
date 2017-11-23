const updateObjInArr = (arr, obj) => (
  arr.map((item) => {
    if (item._id === obj._id) return { ...item, ...obj }
    return item
  })
)

export default updateObjInArr
