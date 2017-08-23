// @flow weak

import moment from 'moment';
import * as shape from 'd3-shape';
import { shuffle } from 'd3-array';
import { genRandomSeries } from 'docs/src/utils/helpers';
import fruits from '../../data/fruits';

export function getInitialValues(days:number) {
  const data = shuffle(fruits).slice(0, 10);
  const time = moment().subtract(days, 'days').hour(0).minute(0);

  const names = {};

  for (let i = 0; i < data.length; i++) {
    const name = data[i].name;
    names[name] = genRandomSeries(days);
  }

  const items = [];

  for (let i = 0; i < days; i++) {
    const date = time.clone().add(i, 'days').toISOString();

    const item = { date, total: 0 };

    for (let j = 0; j < data.length; j++) {
      const label = data[j].name;
      const value = Math.floor(names[label][i] * 1000);
      item[label] = value;
      item.total += value;
    }

    items.push(item);
  }

  return {
    data: items,
    filter: Object.keys(names).sort().map((d) => ({ name: d, show: true })),
  };
}

export function getPath(x, y, yVals, dates) {
  return shape.area()
    .x((d) => x(d))
    .y0((d, i) => y(yVals[i][0]))
    .y1((d, i) => y(yVals[i][1]))(dates);
}
