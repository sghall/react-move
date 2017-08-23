// @flow weak

import moment from 'moment';
import * as shape from 'd3-shape';
import { shuffle } from 'd3-array';
import { genRandomSeries } from 'docs/src/utils/helpers';
import fruits from '../../data/fruits';

const days = 20;

export function getKeys(count) {
  return shuffle(fruits).slice(0, count).map((d) => d.name);
}

export function genData(keys) {
  const series = {};

  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    series[name] = genRandomSeries(days);
  }

  const data = [];

  for (let i = 0; i < days; i++) {
    const date = moment()
      .subtract(days - i, 'days').hour(0).minute(0)
      .toISOString();

    const item = { date, total: 0 };

    for (let j = 0; j < keys.length; j++) {
      const label = keys[j];
      const value = Math.floor(series[label][i] * 1000);
      item[label] = value;
      item.total += value;
    }

    data.push(item);
  }

  return data;
}

export function getPath(x, y, yVals, dates, tension) {
  return shape.area()
    .curve(shape.curveCardinal.tension(tension))
    .x((d) => x(d))
    .y0((d, i) => y(yVals[i][0]))
    .y1((d, i) => y(yVals[i][1]))(dates);
}
