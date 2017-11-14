// const updateObjInArr = (arr, obj) => (
//   arr.map((item) => {
//     if (item._id === obj._id) return { ...obj, ...item }
//     return item
//   })
// )
//
// export default updateObjInArr


const updateObjInArr = (arr, obj) => {
  return arr.map((item) => {
    if (item._id === obj._id) {
      return { ...item, ...obj }
    }
    return item
  })
}

export default updateObjInArr
