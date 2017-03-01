import React, { Component } from 'react'
export default class Header extends Component {
  addItem(e) {
    console.log(e.which)
    if (e.which === 13) {
      const newItemDesc = this.refs.todoItem.value
      this.refs.todoItem.value = ''
      this.props.append(newItemDesc)
    }
  }
  check() {
    let status = this.props.items.every((item) => item.status === true)
    status = (status === true) ? false : true
    this.props.checkAll(status)
  }
  render() {
    return (
      <div id='header'>
        <button className="button-image" id="button-all" type="button" onClick={this.check.bind(this)}>▼</button>
        <input type='text' ref='todoItem' onKeyPress={this.addItem.bind(this)} placeholder='What do you want to do?' id="data" autoComplete='off'/>
      </div>
    )
  }
}