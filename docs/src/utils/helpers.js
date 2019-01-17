// @flow weak

export function kebabCase(string) {
  return string
    .split(/ |_|-/)
    .join('-')
    .split('')
    .map((a, index) => {
      if (a.toUpperCase() === a && a !== '-') {
        return (index !== 0 ? '-' : '') + a.toLowerCase() // eslint-disable-line no-negated-condition
      }
      return a
    })
    .join('')
    .toLowerCase()
}

export function titleize(string) {
  return capsForAbbrv(
    string
      .split('-')
      .map(word => word.split(''))
      .map(letters => {
        const first = letters.shift()
        return [first.toUpperCase(), ...letters].join('')
      })
      .join(' '),
  )
}

function capsForAbbrv(text) {
  if (typeof text !== 'string') {
    return text
  }

  return text
    .split(' ')
    .map(d => {
      return d.length <= 2 ? d.toUpperCase() : d
    })
    .join(' ')
}
