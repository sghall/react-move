/* eslint-env mocha */

import { assert } from 'chai'
import schedule from './schedule'
import { preset, newId } from './transition'

describe('schedule', () => {
  it('should not have a return value', () => {
    const node = { TRANSITION_SCHEDULES: {} }
    const val = schedule(node, 'stateKey', newId(), preset, [])
    assert.strictEqual(val, undefined, 'should be equal')
  })
})
