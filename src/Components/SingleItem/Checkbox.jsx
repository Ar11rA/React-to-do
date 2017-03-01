import React, { Component } from 'react'
export default class Checkbox extends Component {
  update() {
    const newStatus = this.props.item.status === true ? false : true
    this.props.updateTaskStatus(this.props.item.id, newStatus)
  }
  render() {
    const ticked = (this.props.checked === true) ? 'checked' : ''
    return (
      <input className="toggle" type='checkbox' value={this.props.checked} checked={ticked} onChange={this.update.bind(this)} />
    )
  }
}