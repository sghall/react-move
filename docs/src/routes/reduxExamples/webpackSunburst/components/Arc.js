// @flow weak
/* eslint no-nested-ternary:"off" */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { COLORS } from '../module/constants';

class Arc extends PureComponent {
  static propTypes = {
    node: PropTypes.shape({
      value: PropTypes.number.isRequired,
      depth: PropTypes.number.isRequired,
      angle: PropTypes.number.isRequired,
      filePath: PropTypes.string.isRequired,
      noTransition: PropTypes.bool.isRequired,
    }).isRequired,
    d: PropTypes.string.isRequired,
    opacity: PropTypes.number.isRequired,
    activePath: PropTypes.string.isRequired,
    setActivePath: PropTypes.func.isRequired,
    setActiveNode: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const { node: { filePath, value } } = props;

    (this:any).handleMouseOver = props.setActivePath.bind(this, filePath, value);
    (this:any).handleMouseOut = props.setActivePath.bind(this, '', undefined);
  }

  match = new RegExp(`^${this.props.node.filePath}(\/|$)`, 'g') // eslint-disable-line

  handleClick = () => {
    const { setActiveNode, node } = this.props;
    setActiveNode(node);
  }

  handleMouseOver = null;
  handleMouseOut = null;

  render() {
    const { activePath, node, d, opacity } = this.props;
    const active = activePath.match(this.match);

    return (
      <path
        d={d}
        style={{ cursor: 'pointer' }}
        fill={COLORS[node.depth]}
        opacity={node.noTransition ? 1e-6 : active ? 1 : 0.3}
        stroke={active ? 'blue' : node.angle < 0.01 ? 'none' : 'white'}
        strokeOpacity={opacity}
        strokeWidth={0.5}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        onClick={this.handleClick}
      />
    );
  }
}

export default Arc;

