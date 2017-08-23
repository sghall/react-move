// @flow weak

import { createSelector } from 'reselect';
import { pack as packLayout, hierarchy } from 'd3-hierarchy';
import { getSortByKey } from 'docs/src/utils/helpers';
import { AGES, VIEW, TRBL, EXAMPLE_STORE_KEY } from './constants';
import statesByAge from '../../data/statesByAge';

export const dims = [
  VIEW[0] - TRBL[1] - TRBL[3], // Usable dimensions width
  VIEW[1] - TRBL[0] - TRBL[2], // Usable dimensions height
];

// ********************************************************************
//  ACTIONS
// ********************************************************************
const PACKED_BY_AGE_UPDATE_ORDER = 'PACKED_BY_AGE_UPDATE_ORDER';
const PACKED_BY_AGE_UPDATE_COUNT = 'PACKED_BY_AGE_UPDATE_COUNT';

// ********************************************************************
//  ACTION CREATORS
// ********************************************************************
export const updateSortOrder = (sortKey) => ({
  type: PACKED_BY_AGE_UPDATE_ORDER,
  sortKey,
});

export const updateTopCount = (showTop) => ({
  type: PACKED_BY_AGE_UPDATE_COUNT,
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

      const pack = packLayout()
        .padding(2)
        .size([Math.min(...dims), Math.min(...dims)]);

      const nodes = { name: 'root', children: [] };

      for (let i = 0; i < data.length; i++) {
        const d = data[i];


        const state = { name: d.State, children: [] };
        nodes.children.push(state);

        for (let j = 0; j < AGES.length; j++) {
          const group = AGES[j];
          const child = { name: `${d.State} - ${group}`, size: d[group] * d.Total };
          state.children.push(child);
        }
      }

      return {
        showTop,
        sortKey,
        data: pack(
          hierarchy(nodes)
            .sum((d) => d.size)
            .sort((a, b) => b.value - a.value),
        ).descendants().map(({ data: { name }, x, y, r, depth }) => ({
          x, y, r, depth, name,
        })),
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
    case PACKED_BY_AGE_UPDATE_ORDER:
      return Object.assign({}, state, { sortKey: action.sortKey });
    case PACKED_BY_AGE_UPDATE_COUNT:
      return Object.assign({}, state, { showTop: action.showTop });
    default:
      return state;
  }
}
