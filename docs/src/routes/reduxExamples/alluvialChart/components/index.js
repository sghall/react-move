// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import MarkdownElement from 'docs/src/components/MarkdownElement';
import { updateData, changeLayout, changeTension, makeGetSelectedData } from '../module';
import description from '../description.md';
import AlluvialChart from './AlluvialChart';

export class Example extends Component {
  state = {
    duration: 1000,
    tension: this.props.tension,
  }

  setTension = (e, tension) => {
    this.setState({ tension });
  }

  setDuration = (e, duration) => {
    this.setState({ duration });
  }

  changeLayout = (e, d) => {
    const { dispatch } = this.props;
    dispatch(changeLayout(d));
  }

  changeTension = () => {
    const { props, state } = this;
    props.dispatch(changeTension(state.tension));
  }

  render() {
    const { layout, paths, xScale, yScale, dispatch } = this.props;
    const { duration, tension } = this.state;

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
                <h5>Chart Layout:</h5>
                <RadioButtonGroup
                  name="layouts"
                  valueSelected={layout}
                  onChange={this.changeLayout}
                >
                  <RadioButton
                    value="standard"
                    label="Standard"
                  />
                  <RadioButton
                    value="alluvial"
                    label="Alluvial"
                  />
                </RadioButtonGroup>
              </div>
              <div className="col-md-8 col-sm-8">
                <h5>Transition Duration: {(duration / 1000).toFixed(1)} Seconds</h5>
                <Slider
                  sliderStyle={{ marginBottom: 20 }}
                  min={0}
                  max={10000}
                  step={100}
                  value={duration}
                  onChange={this.setDuration}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <RaisedButton
                  style={{ width: '100%', height: 60 }}
                  label="Update Data"
                  onClick={() => dispatch(updateData())}
                />
              </div>
              <div className="col-md-8 col-sm-8">
                <h5>Tension Setting: {(tension).toFixed(2)}</h5>
                <Slider
                  sliderStyle={{ marginBottom: 10 }}
                  min={0}
                  max={1}
                  step={0.01}
                  value={tension}
                  onChange={this.setTension}
                  onDragStop={this.changeTension}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 col-sm-12" style={{ padding: 0 }}>
                <AlluvialChart
                  data={paths}
                  xScale={xScale}
                  yScale={yScale}
                  duration={duration}
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
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  layout: PropTypes.string.isRequired,
  tension: PropTypes.number.isRequired,
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
