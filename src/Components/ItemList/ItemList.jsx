import React, { Component } from 'react'
import SingleItem from '../SingleItem/SingleItem.jsx'
export default class ItemList extends Component {
  render() {
    let itemArr = this.props.items.map((item) => {
      return <SingleItem key={item.id} item={item} updateStatus={this.props.updateStatus} updateTask={this.props.updateTask} deleteTask={this.props.deleteTask}/>
    })
    return (
      <table id='taskTable'>
        <tbody>
        {itemArr}
        </tbody>
      </table>
    )
  }
}