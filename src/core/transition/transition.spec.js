// @flow weak
/* eslint-env mocha */

import React, { Component } from 'react';
import { assert } from 'chai';
import createMount from '../../../test/utils/createMount';
import transition from './transition';
import stop from './stop';

const DURATION = 500;
const DELAY = 500;

class Test extends Component {
  state = {
    line: {
      x1: 5,
      y1: 5,
    },
    rect: {
      x: 5,
      y: 5,
    },
    path: {
      fill: 'green',
      opacity: 1e-6,
    },
    end: 0,
    start: 0,
    interrupt: 0,
  }

  componentDidMount() {
    transition.call(this, {
      line: {
        x1: [5, 200],
        y1: [5, 400],
      },
      rect: {
        x: [5, 1000],
        y: [5, 2000],
      },
      tween: () => {}, // Custom tween
      timing: { duration: DURATION },
      events: {
        interrupt: this.onInterrupt.bind(this),
        start: this.onStart.bind(this),
        end: this.onEnd.bind(this),
      },
    });

    transition.call(this, [{ // Array
      path: {
        opacity: [1e-6, 0.8],
        fill: 'tomato',
      },
      timing: { duration: DURATION, delay: DELAY },
    }]);
  }

  componentWillUnmount() {
    stop.call(this);
  }

  TRANSITION_SCHEDULES = {};

  onStart() {
    this.setState((prevState) => ({
      start: prevState.start + 1,
    }));
  }

  onInterrupt() {
    this.setState((prevState) => ({
      interrupt: prevState.interrupt + 1,
    }));
  }

  onEnd() {
    this.setState((prevState) => ({
      end: prevState.end + 1,
    }));
  }

  render() {
    return (
      <g>
        <line {...this.state.line} />
        <rect {...this.state.rect} />
      </g>
    );
  }
}

describe('transition', () => {
  let mount;

  before(() => {
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });


  it('should change values over time', (done) => {
    const wrapper = mount(<Test />);

    setTimeout(() => {
      assert.isBelow(wrapper.state().line.x1, 200, 'should be true');
      assert.isBelow(wrapper.state().line.y1, 400, 'should be true');
    }, DURATION * 0.5);

    setTimeout(() => {
      assert.strictEqual(wrapper.state().line.x1, 200, 'should be equal');
      assert.strictEqual(wrapper.state().line.y1, 400, 'should be equal');
      done();
    }, DURATION * 1.1);
  });

  it('should transition multiple entities', (done) => {
    const wrapper = mount(<Test />);

    setTimeout(() => {
      assert.strictEqual(wrapper.state().rect.x, 1000, 'should be equal');
      assert.strictEqual(wrapper.state().rect.y, 2000, 'should be equal');

      assert.strictEqual(wrapper.state().line.x1, 200, 'should be equal');
      assert.strictEqual(wrapper.state().line.y1, 400, 'should be equal');

      done();
    }, DURATION * 1.1);
  });

  it('should accept a delay in milliseconds', (done) => {
    const wrapper = mount(<Test />);

    setTimeout(() => {
      assert.strictEqual(wrapper.state().path.opacity, 0.8, 'should be equal');
      done();
    }, (DURATION * 1.1) + DELAY);
  });

  it('should set values not in an array immediately', (done) => {
    const wrapper = mount(<Test />);

    assert.strictEqual(wrapper.state().path.fill, 'tomato', 'should be equal');

    setTimeout(() => {
      done();
    }, DURATION * 1.1);
  });

  it('should call the end event handler once per transition', (done) => {
    const wrapper = mount(<Test />);

    setTimeout(() => {
      const count = wrapper.instance().state.end;
      assert.strictEqual(count, 1, 'should be equal to one');
      done();
    }, DURATION * 1.1);
  });

  it('should call the start event handler once per transition', (done) => {
    const wrapper = mount(<Test />);

    setTimeout(() => {
      const count = wrapper.instance().state.start;
      assert.strictEqual(count, 1, 'should be equal to one');
      done();
    }, DURATION * 1.1);
  });

  it('should call the interrupt event handler once if interrupted', (done) => {
    const wrapper = mount(<Test />);
    const instance = wrapper.instance();

    transition.call(instance, {
      line: {
        x1: [5, 200],
        y1: [5, 400],
      },
      rect: {
        x: [5, 1000],
        y: [5, 2000],
      },
      timing: { duration: DURATION },
    });

    setTimeout(() => {
      assert.strictEqual(instance.state.interrupt, 1, 'should be equal to one');
      done();
    }, DURATION * 1.1);
  });
});
