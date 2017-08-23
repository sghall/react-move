// @flow weak
/* eslint-env mocha */

import React, { Component } from 'react';
import sinon from 'sinon';
import { assert } from 'chai';
import { shallow, mount } from 'enzyme';
import Animate from './Animate';

const data = { x: 100, y: 200 };

class Node extends Component { // eslint-disable-line

  render() {
    return <line />;
  }
}

const renderNode = () => (
  <Node />
);

describe('<Animate />', () => {
  it('should render node', () => {
    const wrapper = shallow(
      <Animate
        data={data}
        start={() => ({})}
      >
        {renderNode}
      </Animate>,
    );

    assert.strictEqual(wrapper.is('Node'), true, 'should be true');
  });

  it('should call update when given new data prop', () => {
    const wrapper = mount(
      <Animate
        data={data}
        start={() => ({})}
      >
        {renderNode}
      </Animate>,
    );

    const spy = sinon.spy(Animate.prototype, 'update');

    wrapper.setProps({ data: { x: 200, y: 400 } });

    const callCount = Animate.prototype.update.callCount;
    spy.restore();

    assert.strictEqual(callCount, 1, 'should have been called once');
  });

  it('should not call update when passed same data prop', () => {
    const wrapper = mount(
      <Animate
        data={data}
        start={() => ({})}
      >
        {renderNode}
      </Animate>,
    );

    const spy = sinon.spy(Animate.prototype, 'update');

    wrapper.setProps({ data });

    const callCount = Animate.prototype.update.callCount;
    spy.restore();

    assert.strictEqual(callCount, 0, 'should not have been called');
  });
});
