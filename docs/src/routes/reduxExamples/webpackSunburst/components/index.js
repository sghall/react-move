// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { timer } from 'd3-timer';
import { easeQuad } from 'd3-ease';
import { format } from 'd3-format';
import { connect } from 'react-redux';
import Slider from 'material-ui/Slider';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import Surface from 'docs/src/components/Surface';
import MarkdownElement from 'docs/src/components/MarkdownElement';
import formatBytes from 'docs/src/utils/formatBytes';
import Sunburst from './Sunburst';
import { getNodes, getScales, updateScales, changeDataSet } from '../module';
import { VIEW, TRBL, DIMS } from '../module/constants';
import { x, y, getScaleInterpolators } from '../module/scales';
import description from '../description.md';

const percentFormat = format('.2%');

export class Example extends Component {
  state = {
    duration: 750,
    activeSize: this.props.size,
    activePath: 'Click on an arc...',
  }

  componentWillMount() {
    const { xScale, yScale } = this.props;

    x.range(xScale.range()).domain(xScale.domain());
    y.range(yScale.range()).domain(yScale.domain());
  }

  componentWillReceiveProps(next) {
    const { props } = this;
    const { duration } = this.state;

    if (next.name !== props.name) {
      this.setState({
        activeSize: next.size,
      });
    }

    if (
      next.xScale !== props.xScale ||
      next.yScale !== props.yScale
    ) {
      if (this.transition) {
        this.transition.stop();
      }

      const { xd, yd, yr } = getScaleInterpolators(next);

      this.transition = timer((elapsed) => {
        const t = easeQuad(elapsed < duration ? (elapsed / duration) : 1);

        x.domain(xd(t));
        y.domain(yd(t)).range(yr(t));

        if (t >= 1) {
          this.transition.stop();
          this.transition = null;
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.transition) {
      this.transition.stop();
    }
  }

  changeDataSet = (e, d) => {
    const { dispatch } = this.props;
    dispatch(changeDataSet(d));
  }

  setActiveNode = (node) => {
    const { dispatch } = this.props;
    dispatch(updateScales(node));
  }

  setActivePath = (path, size) => {
    if (!this.transition) {
      this.setState({
        activeSize: size || this.props.size,
        activePath: path,
      });
    }
  }

  setDuration = (e, value) => {
    this.setState({
      duration: Math.floor(value * 10000),
    });
  }

  transition = null;

  render() {
    const { nodes, name, size, path } = this.props;
    const { duration, activePath, activeSize } = this.state;
    const percentage = percentFormat(activeSize / size);

    return (
      <Paper style={{ padding: 20 }}>
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <MarkdownElement text={description} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <h5>Webpack Data:</h5>
                <RadioButtonGroup
                  name="offsets"
                  valueSelected={name}
                  onChange={this.changeDataSet}
                >
                  <RadioButton
                    value="resonance"
                    label="resonance"
                  />
                  <RadioButton
                    value="material-ui"
                    label="material-ui (stress test)"
                  />
                </RadioButtonGroup>
              </div>
              <div className="col-md-6 col-sm-6">
                <h5>Transition Duration: {(duration / 1000).toFixed(1)} Seconds</h5>
                <Slider
                  defaultValue={0.1}
                  onChange={this.setDuration}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-sm-12" style={{ padding: 0 }}>
                <Surface view={VIEW} trbl={TRBL}>
                  <text fill="rgba(0,0,0,0.5)" y={35} fontSize="10px">{activePath}</text>
                  <g transform={`translate(${DIMS[0] / 2},${DIMS[1] / 2})`}>
                    <text fill="rgba(0,0,0,0.5)" x={-DIMS[0] / 2} y={(-DIMS[1] / 3) - 10} textAnchor="middle" fontSize="20px">{`${percentage}`}</text>
                    <text fill="rgba(0,0,0,0.5)" x={-DIMS[0] / 2} y={(-DIMS[1] / 3) + 10} textAnchor="middle" fontSize="10px">{`${formatBytes(activeSize)}`}</text>
                    <Sunburst
                      data={nodes}
                      path={path}
                      duration={duration}
                      activePath={activePath}
                      setActivePath={this.setActivePath}
                      setActiveNode={this.setActiveNode}
                    />
                  </g>
                </Surface>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}

Example.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  path: PropTypes.func.isRequired,
  nodes: PropTypes.array.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const makeMapStateToProps = () => {
  const mapStateToProps = (state) => {
    const nodes = getNodes(state);
    const { path, xScale, yScale } = getScales(state);
    const name = nodes[0].filePath;
    const size = nodes[0].value;

    return {
      name,
      size,
      path,
      nodes,
      xScale,
      yScale,
    };
  };
  return mapStateToProps;
};


export default connect(makeMapStateToProps())(Example);
