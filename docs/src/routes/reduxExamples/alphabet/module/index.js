// @flow weak
import { createSelector } from 'reselect';
import { VIEW, TRBL, ALPHABET, EXAMPLE_STORE_KEY } from './constants';

export const dims = [
  VIEW[0] - TRBL[1] - TRBL[3], // Usable dimensions width
  VIEW[1] - TRBL[0] - TRBL[2], // Usable dimensions height
];

const space = dims[0] / 26;

// ********************************************************************
//  ACTIONS
// ********************************************************************
const ALPHABET_DATA_UPDATE = 'ALPHABET_DATA_UPDATE';

// ********************************************************************
//  ACTION CREATORS
// ********************************************************************
export function dataUpdate(data) {
  return {
    type: ALPHABET_DATA_UPDATE,
    data,
  };
}

// ********************************************************************
//  SELECTOR
// ********************************************************************
const getletters = (state) => state[EXAMPLE_STORE_KEY];

export const makeGetSelectedData = () => {
  return createSelector(
    [getletters],
    (letters) => {
      const data = letters.map((letter, index) => {
        return { letter, xValue: index * space };
      });

      return { data };
    },
  );
};

// ********************************************************************
//  REDUCER
// ********************************************************************
export default function reducer(state = ALPHABET, action) {
  switch (action.type) {
    case ALPHABET_DATA_UPDATE:
      return action.data;

    default:
      return state;
  }
}

