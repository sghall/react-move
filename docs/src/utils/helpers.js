// @flow weak

export function kebabCase(string) {
  return string.split(/ |_|-/)
    .join('-')
    .split('')
    .map((a, i) => {
      if (a.toUpperCase() === a && a !== '-') {
        return (i !== 0 ? '-' : '') + a.toLowerCase();
      }
      return a;
    })
    .join('')
    .toLowerCase();
}

export function titleize(string) {
  if (string.length <= 3) {
    return string.toUpperCase();
  }

  return string.split('-')
    .map((word) => word.split(''))
    .map((letters) => {
      const first = letters.shift();
      return [first.toUpperCase(), ...letters].join('');
    })
    .join(' ');
}

export const truncate = (string, maxLength = 30) => {
  if (string.length <= maxLength) {
    return string;
  }

  const diff = (string.length + 3) - maxLength;

  return `${string.slice(0, -diff)}...`;
};

export function getSortByKey(key, ascending) {
  return function sort(a, b) {
    let result = 0;

    if (a[key] > b[key]) {
      result = ascending ? 1 : -1;
    }

    if (a[key] < b[key]) {
      result = ascending ? -1 : 1;
    }

    return result;
  };
}

export function genRandomSeries(m:number) {
  function bump(a) {
    const x = 1 / (0.1 + Math.random());
    const y = (2 * Math.random()) - 0.5;
    const z = 10 / (0.1 + Math.random());

    for (let i = 0; i < m; i++) {
      const w = ((i / m) - y) * z;
      a[i] += x * Math.exp(-w * w); // eslint-disable-line no-param-reassign
    }
  }

  const a = [];

  for (let i = 0; i < m; ++i) {
    a[i] = 0;
  }

  for (let i = 0; i < 5; ++i) {
    bump(a);
  }

  return a.map((d) => +Math.max(0, d).toFixed(3));
}
