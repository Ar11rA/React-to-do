import React, { Component } from 'react'
export default class ToDoNote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEdit: false
    }
  }
  changeState() {
    const stateEdit = (this.state.isEdit === false) ? true : false
    this.setState({
      isEdit: stateEdit
    })
  }
  update(e) {
    if (e.keyCode === 13) {
      const newDesc = e.target.value
      this.props.updateTaskDesc(this.props.item.id, newDesc)
      this.setState({
        isEdit: false
      })
    }
    else if (e.keyCode === 27) {
      this.props.updateTaskDesc(this.props.item.id, this.props.item.description)
      e.target.value = this.props.item.description
      this.setState({
        isEdit: false
      })
    }
  }
  doneEditing(e) {
    if (e.target.value !== this.props.item.description)
      this.props.updateTaskDesc(this.props.item.id, e.target.value)
    this.setState({
      isEdit: false
    })
  }
  render() {
    let inputClass = 'desc-design'
    if (this.state.isEdit === true) {
      inputClass = 'edit'
    }
    if (this.props.item.status === true) {
      inputClass += ' striked'
    }
    return (
      <input className={inputClass} type='text' defaultValue={this.props.item.description} onKeyUp={this.update.bind(this)} onDoubleClick={this.changeState.bind(this)} readOnly={!this.state.isEdit} onBlur={this.doneEditing.bind(this)} />
    )
  }
}

