function extend(obj, props) {
  for (const i in props) {
    obj[i] = props[i] // eslint-disable-line no-param-reassign
  }

  return obj
}

function Node(key, data, type) {
  this.key = key
  this.data = data
  this.type = type
  this.state = {}
}

extend(Node.prototype, {
  setState(state) {
    const s = this.state
    extend(s, typeof state === 'function' ? state(s) : state)
  },
  updateData(data) {
    this.data = data

    return this
  },
  updateType(type) {
    this.type = type

    return this
  },
})

export default Node
