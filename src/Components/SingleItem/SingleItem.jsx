import React, { Component } from 'react'
import Checkbox from './Checkbox.jsx'
import ToDoNote from './ToDoNote.jsx'
export default class SingleItem extends Component {
  destroy() {
    this.props.deleteTask(this.props.item.id)
  }
  render() {
    return (
      <tr className="border-bottom"> 
        <td><Checkbox checked={this.props.item.status} item={this.props.item} updateTaskStatus={this.props.updateStatus} /></td>
        <td><ToDoNote item={this.props.item} updateTaskDesc={this.props.updateTask} /></td>
        <td><button className="btn" type='button' onClick={this.destroy.bind(this)}>×</button></td>
      </tr>
    )
  }
}