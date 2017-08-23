// @flow weak
/* eslint no-shadow: 0 */

import { createSelector } from 'reselect';
import * as shape from 'd3-shape';
import { scaleLinear, scaleOrdinal, scaleUtc } from 'd3-scale';
import { utcParse } from 'd3-time-format';
import { extent, merge } from 'd3-array';
import { VIEW, TRBL, COLORS, EXAMPLE_STORE_KEY } from './constants';
import { getInitialValues, getPath } from './helpers';

const { data, filter } = getInitialValues(100);

const colors = scaleOrdinal()
  .range(COLORS)
  .domain(filter.map((d) => d.name));

export const dims = [
  VIEW[0] - TRBL[1] - TRBL[3], // Usable dimensions width
  VIEW[1] - TRBL[0] - TRBL[2], // Usable dimensions height
];

// ********************************************************************
//  ACTIONS
// ********************************************************************
const STACKED_AREA_TOGGLE_FILTER = 'STACKED_AREA_TOGGLE_FILTER';
const STACKED_AREA_CHANGE_OFFSET = 'STACKED_AREA_CHANGE_OFFSET';

// ********************************************************************
//  ACTION CREATORS
// ********************************************************************
export const toggleFilter = (index) => ({
  type: STACKED_AREA_TOGGLE_FILTER,
  index,
});

export const changeOffset = (name) => ({
  type: STACKED_AREA_CHANGE_OFFSET,
  name,
});

// ********************************************************************
//  SELECTOR
// ********************************************************************
const getData = (state) => state[EXAMPLE_STORE_KEY].data;
const getFilter = (state) => state[EXAMPLE_STORE_KEY].filter;
const getOffset = (state) => state[EXAMPLE_STORE_KEY].offset;

export const makeGetSelectedData = () => {
  return createSelector(
    [getData, getFilter, getOffset],
    (data, filter, offset) => {
      const shown = filter.filter((d) => d.show === true);

      if (data.length === 0 || shown.length === 0) {
        return {
          filter,
          offset,
          paths: [],
          xScale: () => 0,
          yScale: () => 0,
        };
      }

      const dates = data.map((d) => utcParse('%Y-%m-%dT%H:%M:%S.%LZ')(d.date));

      let layoutOffset = shape.stackOffsetNone;

      if (offset === 'stream') {
        layoutOffset = shape.stackOffsetSilhouette;
      } else if (offset === 'expand') {
        layoutOffset = shape.stackOffsetExpand;
      }

      const layout = shape.stack()
        .keys(shown.map((d) => d.name))
        .value((d, key) => d[key])
        .offset(layoutOffset)(data);

      const xScale = scaleUtc()
        .range([0, dims[0]])
        .domain([dates[0], dates[dates.length - 1]]);

      const yScale = scaleLinear()
        .range([dims[1], 0])
        .domain(extent(merge(merge(layout))));

      const paths = [];

      for (let k = 0; k < shown.length; k++) {
        paths.push({
          name: shown[k].name,
          fill: colors(shown[k].name),
          path: getPath(xScale, yScale, layout[k], dates),
        });
      }

      return { filter, offset, paths, xScale, yScale };
    },
  );
};

// ********************************************************************
//  REDUCER
// ********************************************************************
const initialState = { data, filter, offset: 'stream' };

function toggle(state, action) {
  const item = state.filter[action.index];

  return [
    ...state.filter.slice(0, action.index),
    { name: item.name, show: !item.show },
    ...state.filter.slice(action.index + 1),
  ];
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case STACKED_AREA_TOGGLE_FILTER:
      return Object.assign({}, state, { filter: toggle(state, action) });
    case STACKED_AREA_CHANGE_OFFSET:
      return Object.assign({}, state, { offset: action.name });
    default:
      return state;
  }
}
