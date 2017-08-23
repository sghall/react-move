// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NodeGroup from 'resonance/NodeGroup';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { shuffle } from 'd3-array';
import { interval } from 'd3-timer';
import { easePoly, easeBounce } from 'd3-ease';
import Surface from 'docs/src/components/Surface';
import MarkdownElement from 'docs/src/components/MarkdownElement';
import { VIEW, TRBL, ALPHABET, BASE_DURATION } from '../module/constants';
import { dataUpdate, makeGetSelectedData, dims } from '../module';
import description from '../description.md';

export class Example extends Component {
  componentDidMount() {
    const { props: { dispatch } } = this;

    this.loop = interval(() => {
      dispatch(dataUpdate(shuffle(ALPHABET)
        .slice(0, Math.floor(Math.random() * 26))
        .sort()));
    }, BASE_DURATION * 1.5);
  }

  componentWillUnmount() {
    this.loop.stop();
  }

  loop = null // interval set on mount

  render() {
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
              <div className="col-md-12 col-sm-12">
                <Surface view={VIEW} trbl={TRBL}>
                  <line
                    stroke="grey"
                    x1={0}
                    y1={dims[1] / 2}
                    x2={dims[0]}
                    y2={dims[1] / 2}
                  />
                  <NodeGroup
                    data={this.props.data}
                    keyAccessor={(d) => d.letter}

                    start={(data) => ({
                      x: data.xValue,
                      y: 0,
                      fill: '#3C564B',
                      opacity: 1e-6,
                    })}

                    enter={() => ({
                      y: [0, dims[1] / 2],
                      fill: '#3C564B',
                      opacity: [1e-6, 1],
                      timing: { duration: BASE_DURATION, ease: easePoly },
                    })}

                    update={(data) => ({
                      x: [data.xValue],
                      y: [dims[1] / 2],
                      fill: '#A5937C',
                      opacity: [1],
                      timing: { duration: BASE_DURATION, ease: easeBounce },
                    })}

                    leave={(data) => ({
                      x: [data.xValue],
                      y: [dims[1]],
                      fill: '#A5937C',
                      opacity: [1e-6],
                      timing: { duration: BASE_DURATION / 2, ease: easePoly },
                    })}
                  >
                    {(nodes) => (
                      <g>
                        {nodes.map(({ key, data: { letter }, state }) => (
                          <text
                            key={key}
                            dy="-.35em"
                            style={{ font: 'bold 30px monospace' }}
                            {...state}
                          >{letter}</text>
                        ))}
                      </g>
                    )}
                  </NodeGroup>
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
  data: PropTypes.array.isRequired,
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
