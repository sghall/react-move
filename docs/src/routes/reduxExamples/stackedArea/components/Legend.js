// @flow weak

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

class Legend extends PureComponent {
  static propTypes = {
    filter: PropTypes.array.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    setActiveSeries: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    (this:any).setSeries = this.setSeries.bind(this);
    (this:any).resetSeries = this.resetSeries.bind(this);
  }

  setSeries(e) {
    const { setActiveSeries } = this.props;
    setActiveSeries(e.target.innerHTML);
  }

  resetSeries() {
    const { setActiveSeries } = this.props;
    setActiveSeries('');
  }

  render() {
    const { filter, toggleFilter } = this.props;

    return (
      <Table
        multiSelectable
        wrapperStyle={{ width: '100%' }}
        onCellClick={toggleFilter}
      >
        <TableBody deselectOnClickaway={false}>
          {filter.map((d) => {
            const isSelected = d.show;
            return (
              <TableRow
                key={d.name}
                selected={isSelected}
                onMouseOver={this.setSeries}
                onMouseOut={this.resetSeries}
              >
                <TableRowColumn>{d.name}</TableRowColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

export default Legend;
