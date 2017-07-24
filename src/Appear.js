import React, { Component } from 'react'
//
import Transition from './Transition'

export default class Appear extends Component {
  static defaultProps = {
    show: true,
  }
  constructor () {
    super()
    this.refresh = this.refresh.bind(this)
  }
  componentWillMount () {
    this.refresh(this.props)
  }
  componentWillReceiveProps (props) {
    this.refresh(props)
  }
  refresh (props) {
    this.update = () => props.update
    this.enter = () => props.enter
    this.leave = () => props.leave
  }
  render () {
    const { show, update, enter, leave, children, ...rest } = this.props
    return (
      <Transition
        {...rest}
        data={show ? [true] : []}
        getKey={d => d}
        update={this.update}
        enter={this.enter}
        leave={this.leave}
      >
        {items => (items.length ? children(items[0].state) : null)}
      </Transition>
    )
  }
}
