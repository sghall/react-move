import React from 'react'
import '../utils/prism.js'

export default React.createClass({
  getInitialState() {
    return {
      show: false
    }
  },
  render() {
    const { show } = this.state
    const { language, children } = this.props
    return (
      <div>
        <button
          onClick={() =>
            this.setState(state => ({
              show: !state.show
            }))}
        >
          {show ? 'Hide Source' : 'Show Source'}
        </button>
        {!!show &&
          <pre>
            <code className={'language-' + (language || 'jsx')}>
              {children()}
            </code>
          </pre>}
      </div>
    )
  },
  componentDidUpdate() {
    if (this.state.show) {
      window.Prism && window.Prism.highlightAll()
    }
  }
})
