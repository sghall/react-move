/* eslint-env mocha */

import React, { Component } from 'react'
import { interpolate, interpolateTransformSvg } from 'd3-interpolate'
import sinon from 'sinon'
import { assert } from 'chai'
import { shallow, mount } from 'enzyme'
import createNodeGroup from '.'

const NodeGroup = createNodeGroup(function getInterpolator(attr, begValue, endValue) {
  if (attr === 'transform') {
    return interpolateTransformSvg(begValue, endValue)
  }

  return interpolate(begValue, endValue)
})

function getData() {
  return [1, 2, 3, 4, 5].map(d => ({ val: d, key: `key-${d}` }))
}

const keyAccessor = d => d.key

class Node extends Component {
  render() {
    return <div />
  }
}

const renderChildren = nodes => (
  <div>
    {nodes.map(({ key }) => (
      <Node key={key} />
    ))}
  </div>
)

describe('<NodeGroup />', () => {
  it('should render nodes wrapped in the outer element', () => {
    const wrapper = shallow(
      <NodeGroup data={getData()} keyAccessor={keyAccessor} start={() => ({})}>
        {renderChildren}
      </NodeGroup>,
    )

    assert.strictEqual(wrapper.is('div'), true, 'should be true')
  })

  it('should render a node for each data item', () => {
    const data = getData()

    const wrapper = mount(
      <NodeGroup data={data} keyAccessor={keyAccessor} start={() => ({})}>
        {renderChildren}
      </NodeGroup>,
    )

    assert.strictEqual(
      wrapper.find(Node).length,
      data.length,
      'should be equal',
    )
  })

  it('should remove nodes that are not transitioning', (done) => {
    const data = getData()

    const wrapper = mount(
      <NodeGroup
        data={data}
        keyAccessor={keyAccessor}
        start={() => ({})}
      >
        {renderChildren}
      </NodeGroup>,
    )

    const data2 = data.slice(1)

    wrapper.setProps({ data: data2 })

    setTimeout(() => {
      assert.strictEqual(wrapper.state().nodes.length, data2.length)
      done()
    }, 500)
  })

  it('should call startInterval when given new data prop', () => {
    const data = getData()

    const wrapper = mount(
      <NodeGroup data={data} keyAccessor={keyAccessor} start={() => ({})}>
        {renderChildren}
      </NodeGroup>,
    )

    const spy = sinon.spy(NodeGroup.prototype, 'startInterval')

    wrapper.setProps({ data: data.slice(0, 2) })

    const callCount = NodeGroup.prototype.startInterval.callCount
    spy.restore()

    assert.strictEqual(callCount, 1, 'should have been called once')
  })

  it('should not call startInterval when passed same data prop', () => {
    const data = getData()

    const wrapper = mount(
      <NodeGroup data={data} keyAccessor={d => d.val} start={() => ({})}>
        {renderChildren}
      </NodeGroup>,
    )

    const spy = sinon.spy(NodeGroup.prototype, 'startInterval')

    wrapper.setProps({ data })

    const callCount = NodeGroup.prototype.startInterval.callCount
    spy.restore()

    assert.strictEqual(callCount, 0, 'should not have been called')
  })
})
