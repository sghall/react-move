// @flow weak
/* eslint-env mocha */

import React, { Component } from 'react';
import sinon from 'sinon';
import { assert } from 'chai';
import { shallow, mount } from 'enzyme';
import Animate from './Animate';

class Node extends Component { // eslint-disable-line
  render() {
    return <line />;
  }
}

const renderNode = () => (
  <Node />
);

describe('<Animate />', () => {
  it('should render child Node', () => {
    const wrapper = shallow(
      <Animate
        start={{}}
      >
        {renderNode}
      </Animate>,
    );

    assert.strictEqual(wrapper.find(Node).length, 1, 'should be true');
  });

  it('should call the child function once when show is true', () => {
    const spy = sinon.spy(renderNode);

    mount(
      <Animate
        show
        start={{}}
      >
        {spy}
      </Animate>,
    );

    const callCount = spy.callCount;

    assert.strictEqual(callCount, 1, 'should have been called once');
  });

  it('should NOT call the child function when show is set to false', () => {
    const spy = sinon.spy();

    mount(
      <Animate
        show={false}
        start={{}}
      >
        {spy}
      </Animate>,
    );

    const callCount = spy.callCount;

    assert.strictEqual(callCount, 0, 'should not have been called');
  });

  it('should run enter transition immediately after mounting if show is true', (done) => {
    const wrapper = mount(
      <Animate
        show
        start={{ opacity: 0 }}
        enter={{ opacity: [1] }}
      >
        {renderNode}
      </Animate>,
    );

    setTimeout(() => {
      assert.strictEqual(wrapper.state('opacity'), 1, 'should be equal');
      done();
    }, 500);
  });

  it('should NOT run enter transition immediately after mounting if show is false', (done) => {
    const wrapper = mount(
      <Animate
        show={false}
        start={{ opacity: 0 }}
        enter={{ opacity: [1] }}
      >
        {renderNode}
      </Animate>,
    );

    setTimeout(() => {
      assert.strictEqual(wrapper.state('opacity'), 0, 'should be equal');
      done();
    }, 500);
  });

  it('should run update transition when props update', (done) => {
    const wrapper = mount(
      <Animate
        start={{ opacity: 0 }}
        update={{ opacity: [0.7] }}
      >
        {renderNode}
      </Animate>,
    );

    wrapper.setProps({ show: true });

    setTimeout(() => {
      assert.strictEqual(wrapper.find(Node).length, 1, 'should be equal');
      assert.strictEqual(wrapper.state('opacity'), 0.7, 'should be equal');
      done();
    }, 500);
  });

  it('should run leave transition when show changes to false', (done) => {
    const wrapper = mount(
      <Animate
        show
        start={{ opacity: 0 }}
        leave={{ opacity: [0.7] }}
      >
        {renderNode}
      </Animate>,
    );

    wrapper.setProps({ show: false });

    setTimeout(() => {
      assert.strictEqual(wrapper.find(Node).length, 0, 'should be equal');
      assert.strictEqual(wrapper.state('opacity'), 0.7, 'should be equal');
      done();
    }, 500);
  });

  it('should support enter prop as a function', (done) => {
    const wrapper = mount(
      <Animate
        start={{ opacity: 0 }}
        enter={() => ({ opacity: [1] })}
      >
        {renderNode}
      </Animate>,
    );

    setTimeout(() => {
      assert.strictEqual(wrapper.state('opacity'), 1, 'should be equal');
      done();
    }, 500);
  });

  it('should support update prop as a function', (done) => {
    const wrapper = mount(
      <Animate
        start={{ opacity: 0 }}
        update={() => ({ opacity: [0.7] })}
      >
        {renderNode}
      </Animate>,
    );

    wrapper.setProps({ show: true });

    setTimeout(() => {
      assert.strictEqual(wrapper.find(Node).length, 1, 'should be equal');
      assert.strictEqual(wrapper.state('opacity'), 0.7, 'should be equal');
      done();
    }, 500);
  });

  it('should support leave prop as a function', (done) => {
    const wrapper = mount(
      <Animate
        show
        start={{ opacity: 0 }}
        leave={() => ({ opacity: [0.7] })}
      >
        {renderNode}
      </Animate>,
    );

    wrapper.setProps({ show: false });

    setTimeout(() => {
      assert.strictEqual(wrapper.find(Node).length, 0, 'should be equal');
      assert.strictEqual(wrapper.state('opacity'), 0.7, 'should be equal');
      done();
    }, 500);
  });
});
