// @flow weak
/* eslint-env mocha */
/* eslint react/no-multi-comp:0 */

import React, { Component } from 'react'
import { assert } from 'chai'
import createMount from '../../../test/utils/createMount'
import transition from './transition'
import stop from './stop'

const DURATION = 500
const DELAY = 50

class Line extends Component {
  constructor(props) {
    super(props)

    this.state = {
      line: {
        x1: 0,
        y1: 0,
      },
    }
  }

  componentDidMount() {
    transition.call(this, {
      line: {
        x1: [200],
        y1: [200],
      },
      timing: {
        duration: DURATION,
        delay: DELAY,
      },
    })

    setTimeout(() => {
      stop.call(this)
    }, DELAY + (DURATION / 2))
  }

  componentWillUnmount() {
    stop.call(this)
  }

  TRANSITION_SCHEDULES = {};

  render() {
    return (
      <div>
        <div {...this.state.line} />
      </div>
    )
  }
}

describe('stop', () => {
  let mount

  before(() => {
    mount = createMount()
  })

  after(() => {
    mount.cleanUp()
  })

  it('should stop all transitions in progress ', (done) => {
    const wrapper = mount(<Line />)

    setTimeout(() => {
      const x1 = wrapper.state().line.x1
      const y1 = wrapper.state().line.y1

      assert.isAbove(x1, 0, 'should be true')
      assert.isBelow(x1, 200, 'should be true')
      assert.isAbove(y1, 0, 'should be true')
      assert.isBelow(y1, 200, 'should be true')
      done()
    }, DELAY + (DURATION * 1.5))
  })
})
