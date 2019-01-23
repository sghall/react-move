/* eslint-env mocha */

import React, { Component } from 'react'
import sinon from 'sinon'
import { assert } from 'chai'
import { shallow, mount } from 'enzyme'
import NodeGroup from './NodeGroup'

const data = [1, 2, 3, 4, 5].map(d => ({ val: d }))

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
      <NodeGroup data={data} keyAccessor={d => d.val} start={() => ({})}>
        {renderChildren}
      </NodeGroup>,
    )

    assert.strictEqual(wrapper.is('div'), true, 'should be true')
  })

  it('should render a node for each data item', () => {
    const wrapper = mount(
      <NodeGroup data={data} keyAccessor={d => d.val} start={() => ({})}>
        {renderChildren}
      </NodeGroup>,
    )

    assert.strictEqual(
      wrapper.find(Node).length,
      data.length,
      'should be equal',
    )
  })

  // it('should remove nodes that are not transitioning', (done) => {
  //   const wrapper = mount(
  //     <NodeGroup
  //       data={data}
  //       keyAccessor={(d) => d.val}
  //       start={() => ({})}
  //     >
  //       {renderChildren}
  //     </NodeGroup>,
  //   );

  //   wrapper.setProps({ data: data.slice(1) });

  //   setTimeout(() => {
  //     assert.strictEqual(wrapper.find(Node).length, data.length - 1, 'should be equal');
  //     done();
  //   }, msPerFrame * 2);
  // });

  it('should call startInterval when given new data prop', () => {
    const wrapper = mount(
      <NodeGroup data={data} keyAccessor={d => d.val} start={() => ({})}>
        {renderChildren}
      </NodeGroup>,
    )

    const spy = sinon.spy(NodeGroup.prototype, 'startInterval')

    wrapper.setProps({ data: [{ val: 1 }, { val: 2 }] })

    const callCount = NodeGroup.prototype.startInterval.callCount
    spy.restore()

    assert.strictEqual(callCount, 1, 'should have been called once')
  })

  it('should not call startInterval when passed same data prop', () => {
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
