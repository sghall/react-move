import DeepEqual from 'deep-equal'

export default {
  deepEquals,
  pickBy,
}

function deepEquals (a, b) {
  return DeepEqual(a, b)
}

function pickBy (obj, cb) {
  const newObj = {}
  for (var key in obj) {
    if (cb(obj[key], key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}
