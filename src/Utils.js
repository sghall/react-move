export default {
  deepEquals
}

function deepEquals (a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}
