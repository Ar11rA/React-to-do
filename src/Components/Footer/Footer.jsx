import React, { Component } from 'react'
import { Link } from 'react-router'
export default class Footer extends Component {
  displayActive() {
    this.props.filterActive()
  }
  clear() {
    this.props.clearCompleted()
  }
  render() {
    let activeItemCount = 0
    this.props.items.forEach((item) => {
      if (item.status === false) {
        activeItemCount++
      }
    })
    let button=''
    if(this.props.items.length !== activeItemCount){
      button=<button onClick={this.clear.bind(this)}>Clear Completed</button>
    }
    return (
      <div className='footer'>
        <span id='count-items'><b>{activeItemCount}</b> items left</span>
        <button ><Link activeClassName='selected' to='All'>All</Link></button>
        <button ><Link activeClassName='selected' to='Active'>Active</Link></button>
        <button ><Link activeClassName='selected' to='Completed'>Completed</Link></button>
        {button}
      </div>
    )
  }
}