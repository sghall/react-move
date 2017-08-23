// @flow weak
/* eslint-env mocha */

import React, { Component } from 'react';
import sinon from 'sinon';
import { assert } from 'chai';
import { shallow, mount } from 'enzyme';
import TickGroup from './TickGroup';
import NodeGroup from '../NodeGroup';

const msPerFrame = 1000 / 60;

const scale = () => {};
scale.ticks = () => [1, 2, 3, 4, 5];

const scale0 = () => {};
scale0.ticks = () => [1, 2, 3, 4];

class Node extends Component { // eslint-disable-line

  render() {
    return <line />;
  }
}

const renderChildren = (ticks) => (
  <g>
    {ticks.map(({ key }) => (
      <Node key={key} />
    ))}
  </g>
);

describe('<TickGroup />', () => {
  it('should render a NodeGroup as the outer element', () => {
    const wrapper = shallow(
      <TickGroup
        scale={scale}
        start={() => ({})}
      >
        {renderChildren}
      </TickGroup>,
    );

    assert.strictEqual(wrapper.is(NodeGroup), true, 'should be true');
  });

  it('should render a node for each scale item', () => {
    const wrapper = mount(
      <TickGroup
        scale={scale}
        start={() => ({})}
      >
        {renderChildren}
      </TickGroup>,
    );

    assert.strictEqual(wrapper.find(Node).length, scale.ticks().length, 'should be equal');
  });

  it('should remove ticks that are not transitioning', (done) => {
    const wrapper = mount(
      <TickGroup
        scale={scale}
        start={() => ({})}
      >
        {renderChildren}
      </TickGroup>,
    );

    wrapper.setProps({ scale: scale0 });

    setTimeout(() => {
      assert.strictEqual(wrapper.find(Node).length, scale0.ticks().length, 'should be equal');
      done();
    }, msPerFrame * 2);
  });

  it('should call updateTicks when given new data prop', () => {
    const wrapper = mount(
      <TickGroup
        scale={scale}
        start={() => ({})}
      >
        {renderChildren}
      </TickGroup>,
    );

    const spy = sinon.spy(TickGroup.prototype, 'updateTicks');

    wrapper.setProps({ scale: scale0 });

    const callCount = TickGroup.prototype.updateTicks.callCount;
    spy.restore();

    assert.strictEqual(callCount, 1, 'should have been called once');
  });

  it('should not call updateTicks when passed same data prop', () => {
    const wrapper = mount(
      <TickGroup
        scale={scale}
        start={() => ({})}
      >
        {renderChildren}
      </TickGroup>,
    );

    const spy = sinon.spy(TickGroup.prototype, 'updateTicks');

    wrapper.setProps({ scale });

    const callCount = TickGroup.prototype.updateTicks.callCount;
    spy.restore();

    assert.strictEqual(callCount, 0, 'should not have been called');
  });
});
