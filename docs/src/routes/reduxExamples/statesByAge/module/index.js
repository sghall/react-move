// @flow weak
import { createSelector } from 'reselect';
import { scaleLinear, scaleBand } from 'd3-scale';
import { getSortByKey } from 'docs/src/utils/helpers';
import { VIEW, TRBL, EXAMPLE_STORE_KEY } from './constants';
import statesByAge from '../../data/statesByAge';

export const dims = [
  VIEW[0] - TRBL[1] - TRBL[3], // Usable dimensions width
  VIEW[1] - TRBL[0] - TRBL[2], // Usable dimensions height
];

// ********************************************************************
//  ACTIONS
// ********************************************************************
const STATES_BY_AGE_UPDATE_ORDER = 'STATES_BY_AGE_UPDATE_ORDER';
const STATES_BY_AGE_UPDATE_COUNT = 'STATES_BY_AGE_UPDATE_COUNT';

// ********************************************************************
//  ACTION CREATORS
// ********************************************************************
export const updateSortOrder = (sortKey) => ({
  type: STATES_BY_AGE_UPDATE_ORDER,
  sortKey,
});

export const updateTopCount = (showTop) => ({
  type: STATES_BY_AGE_UPDATE_COUNT,
  showTop,
});

// ********************************************************************
//  SELECTOR
// ********************************************************************
const getRawData = (state) => state[EXAMPLE_STORE_KEY].rawData;
const getSortKey = (state) => state[EXAMPLE_STORE_KEY].sortKey;
const getShowTop = (state) => state[EXAMPLE_STORE_KEY].showTop;

export const makeGetSelectedData = () => {
  return createSelector(
    [getRawData, getSortKey, getShowTop],
    (rawData, sortKey, showTop) => {
      if (rawData.length === 0) {
        return {
          sortKey,
          data: rawData,
          xScale: () => 0,
          yScale: () => 0,
        };
      }

      const sort = getSortByKey(sortKey);
      const data = rawData.sort(sort).slice(0, showTop);

      const xExtent = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];
      const yDomain = {};

      for (let i = 0; i < data.length; i++) {
        const d = data[i];

        if (d[sortKey] < xExtent[0]) xExtent[0] = d[sortKey];
        if (d[sortKey] > xExtent[1]) xExtent[1] = d[sortKey];

        yDomain[d.State] = true;
      }

      const xScale = scaleLinear()
        .range([0, dims[0]])
        .domain([0, xExtent[1]]);

      const yScale = scaleBand()
        .rangeRound([0, dims[1]])
        .padding(0.1)
        .domain(Object.keys(yDomain));

      return {
        showTop,
        sortKey,
        data: data.map((d) => ({
          name: d.State,
          xVal: xScale(d[sortKey]),
          yVal: yScale(d.State),
        })),
        xScale,
        yScale,
      };
    },
  );
};

// ********************************************************************
//  REDUCER
// ********************************************************************
const initialState = { rawData: statesByAge, showTop: 10, sortKey: 'Under 5 Years' };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case STATES_BY_AGE_UPDATE_ORDER:
      return Object.assign({}, state, { sortKey: action.sortKey });
    case STATES_BY_AGE_UPDATE_COUNT:
      return Object.assign({}, state, { showTop: action.showTop });
    default:
      return state;
  }
}
