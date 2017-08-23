// @flow weak
/* eslint no-shadow: 0 */

import { createSelector } from 'reselect';
import * as shape from 'd3-shape';
import { scaleLinear, scaleOrdinal, scaleUtc } from 'd3-scale';
import { utcParse } from 'd3-time-format';
import { extent, merge } from 'd3-array';
import { VIEW, TRBL, COLORS, EXAMPLE_STORE_KEY } from './constants';
import { getKeys, genData, getPath } from './helpers';

const keys = getKeys(20);

const colors = scaleOrdinal()
  .range(COLORS)
  .domain(keys);

export const dims = [
  VIEW[0] - TRBL[1] - TRBL[3], // Usable dimensions width
  VIEW[1] - TRBL[0] - TRBL[2], // Usable dimensions height
];

// ********************************************************************
//  ACTIONS
// ********************************************************************
const ALLUVIAL_CHART_UPDATE_DATA = 'ALLUVIAL_CHART_UPDATE_DATA';
const ALLUVIAL_CHART_CHANGE_LAYOUT = 'ALLUVIAL_CHART_CHANGE_LAYOUT';
const ALLUVIAL_CHART_CHANGE_TENSION = 'ALLUVIAL_CHART_CHANGE_TENSION';

// ********************************************************************
//  ACTION CREATORS
// ********************************************************************
export const changeLayout = (name) => ({
  type: ALLUVIAL_CHART_CHANGE_LAYOUT,
  name,
});

export const changeTension = (value) => ({
  type: ALLUVIAL_CHART_CHANGE_TENSION,
  value,
});

export const updateData = () => ({
  type: ALLUVIAL_CHART_UPDATE_DATA,
});

// ********************************************************************
//  SELECTOR
// ********************************************************************
const getData = (state) => state[EXAMPLE_STORE_KEY].data;
const getLayout = (state) => state[EXAMPLE_STORE_KEY].layout;
const getTension = (state) => state[EXAMPLE_STORE_KEY].tension;

export const makeGetSelectedData = () => {
  return createSelector(
    [getData, getLayout, getTension],
    (data, layout, tension) => {
      const dates = data.map((d) => utcParse('%Y-%m-%dT%H:%M:%S.%LZ')(d.date));

      const stacked = shape.stack()
        .keys(keys)
        .value((d, key) => d[key])
        .offset(shape.stackOffsetSilhouette)(data);


      if (layout === 'alluvial') {
        const lenY = stacked.length;
        const lenX = stacked[0].length;

        for (let x = 0; x < lenX; x++) {
          const temp = [];

          let minY = Number.POSITIVE_INFINITY;

          for (let y = 0; y < lenY; y++) {
            const y0 = stacked[y][x][0];
            const y1 = stacked[y][x][1];
            const dy = y1 - y0;

            if (y0 < minY) {
              minY = y0;
            }

            temp.push({ y, dy });
          }

          const sorted = temp.sort((a, b) => a.dy - b.dy);

          let curY = minY;

          for (let k = 0; k < lenY; k++) {
            const { y, dy } = sorted[k];

            stacked[y][x][0] = curY;
            stacked[y][x][1] = curY + dy;

            curY += dy;
          }
        }
      }

      const xScale = scaleUtc()
        .range([0, dims[0]])
        .domain([dates[0], dates[dates.length - 1]]);

      const yScale = scaleLinear()
        .range([dims[1], 0])
        .domain(extent(merge(merge(stacked))));

      const paths = [];

      for (let k = 0; k < keys.length; k++) {
        paths.push({
          name: keys[k],
          fill: colors(keys[k]),
          path: getPath(xScale, yScale, stacked[k], dates, tension),
        });
      }

      return { paths, xScale, yScale, layout, tension };
    },
  );
};

// ********************************************************************
//  REDUCER
// ********************************************************************
const initialState = { data: genData(keys), layout: 'alluvial', tension: 0.1 };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ALLUVIAL_CHART_UPDATE_DATA:
      return Object.assign({}, state, { data: genData(keys) });
    case ALLUVIAL_CHART_CHANGE_LAYOUT:
      return Object.assign({}, state, { layout: action.name });
    case ALLUVIAL_CHART_CHANGE_TENSION:
      return Object.assign({}, state, { tension: action.value });
    default:
      return state;
  }
}
