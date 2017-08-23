// @flow weak
/* eslint-env mocha */

import { assert } from 'chai';
import mergeKeys from './mergeKeys';

// from react-motion mergeDiff
// core keys merging algorithm. If previous render's keys are [a, b], and the
// next render's [c, b, d], what's the final merged keys and ordering?

// - c and a must both be before b
// - b before d
// - ordering between a and c ambiguous

// this reduces to merging two partially ordered lists (e.g. lists where not
// every item has a definite ordering, like comparing a and c above). For the
// ambiguous ordering we deterministically choose to place the next render's
// item after the previous'; so c after a

// this is called a topological sorting. Except the existing algorithms don't
// work well with js bc of the amount of allocation, and isn't optimized for our
// current use-case bc the runtime is linear in terms of edges (see wiki for
// meaning), which is huge when two lists have many common elements

describe('mergeKeys', () => {
  it('should return keys in the correct order', () => {
    const currKeyIndex = {};
    const currNodeKeys = ['a', 'b'];

    for (let i = 0; i < currNodeKeys.length; i++) {
      currKeyIndex[currNodeKeys[i]] = i;
    }

    const nextKeyIndex = {};
    const nextNodeKeys = ['c', 'b', 'd'];

    for (let i = 0; i < nextNodeKeys.length; i++) {
      nextKeyIndex[nextNodeKeys[i]] = i;
    }

    const mergedKeys = mergeKeys(
      currNodeKeys,
      currKeyIndex,
      nextNodeKeys,
      nextKeyIndex,
    );

    assert.deepEqual(mergedKeys, ['a', 'c', 'b', 'd'], 'should be true');
  });
});
