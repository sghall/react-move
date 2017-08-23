// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';
import MarkdownElement from 'docs/src/components/MarkdownElement';
import { changeOffset, toggleFilter, makeGetSelectedData } from '../module';
import Legend from './Legend';
import description from '../description.md';
import StackedChart from './StackedChart';

export class Example extends Component {
  constructor(props) {
    super(props);

    (this:any).setDuration = this.setDuration.bind(this);
    (this:any).changeOffset = this.changeOffset.bind(this);
    (this:any).toggleFilter = this.toggleFilter.bind(this);
    (this:any).setActiveSeries = this.setActiveSeries.bind(this);
  }

  state = {
    duration: 1000,
    activeSeries: '',
  }

  setDuration(e, value) {
    this.setState({
      duration: Math.floor(value * 10000),
    });
  }

  changeOffset(e, d) {
    const { dispatch } = this.props;
    dispatch(changeOffset(d));
  }

  toggleFilter(d) {
    const { dispatch } = this.props;
    dispatch(toggleFilter(d));
  }

  setActiveSeries(activeSeries) {
    this.setState({ activeSeries });
  }

  render() {
    const { filter, offset, paths, xScale, yScale } = this.props;
    const { duration, activeSeries } = this.state;

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
              <div className="col-md-4 col-sm-4">
                <h5>Chart Offset:</h5>
                <RadioButtonGroup
                  name="offsets"
                  valueSelected={offset}
                  onChange={this.changeOffset}
                >
                  <RadioButton
                    value="stacked"
                    label="Stacked"
                  />
                  <RadioButton
                    value="stream"
                    label="Stream"
                  />
                </RadioButtonGroup>
              </div>
              <div className="col-md-8 col-sm-8">
                <h5>Transition Duration: {(duration / 1000).toFixed(1)} Seconds</h5>
                <Slider
                  defaultValue={0.1}
                  onChange={this.setDuration}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-3">
                <Legend
                  filter={filter}
                  toggleFilter={this.toggleFilter}
                  setActiveSeries={this.setActiveSeries}
                />
              </div>
              <div className="col-md-8 col-sm-9" style={{ padding: 0 }}>
                <StackedChart
                  data={paths}
                  xScale={xScale}
                  yScale={yScale}
                  duration={duration}
                  activeSeries={activeSeries}
                />
              </div>
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}

Example.propTypes = {
  paths: PropTypes.array.isRequired,
  filter: PropTypes.array.isRequired,
  offset: PropTypes.string.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const makeMapStateToProps = () => {
  const getSelectedData = makeGetSelectedData();
  const mapStateToProps = (state) => {
    return getSelectedData(state);
  };
  return mapStateToProps;
};


export default connect(makeMapStateToProps())(Example);
