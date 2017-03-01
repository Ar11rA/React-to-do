import React, { Component } from 'react'
import './App.css'
import Header from '../Header/Header.jsx'
import ItemList from '../ItemList/ItemList.jsx'
import Footer from '../Footer/Footer.jsx'
import axios from 'axios'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:3010/read').then((response) => {
      this.setState({
        items: response.data
      })
    })
  }
  
  appendToItems(description) {
    const prevItems = this.state.items
    fetch(`http://localhost:3010/write/${description}`, { method: 'post' }).then((response) => {
      return response.json()
    })
      .then((data) => {
        let newItem = { id: data[0].id, description: description, status: false }
        prevItems.push(newItem)
        this.setState({
          items: prevItems
        })
      })
  }
  updateStatus(id, status) {
    const prevItems = this.state.items
    let data = {
      status: status
    }
    fetch(`http://localhost:3010/update/${id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    }).then(() => {
      prevItems.forEach((item) => {
        if (item.id === id)
          item.status = status
      })
      this.setState({
        items: prevItems
      })
    })
  }
  updateTask(id, description) {
    const prevItems = this.state.items
    let data = {
      description: description,
    }
    return fetch(`http://localhost:3010/update/${id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json'
      }
    }).then(() => {
      prevItems.forEach((item) => {
        if (item.id === id)
          item.description = description
      })
      this.setState({
        items: prevItems
      })
    })
  }
  deleteTask(id) {
    const prevItems = this.state.items.filter((item) => item.id !== id)
    fetch(`http://localhost:3010/destroy/${id}`, { method: 'delete' }).then(() => {
      this.setState({
        items: prevItems
      })
    })
  }
  checkAll(status) {
    const prevItems = this.state.items.map((item) => {
      item.status = status
      return item
    })
    fetch(`http://localhost:3010/updateAll/${status}`, {
      method: 'put',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(() => {
      this.setState({
        items: prevItems
      })
    })
  }
  clearCompleted() {
    const prevItems = this.state.items.filter((item) => item.status === false)
    fetch('http://localhost:3010/destroyAll', { method: 'delete' }).then(
      this.setState({
        items: prevItems
      })
    )
  }
  render() {
    let newItems = []
    const category = this.props.params.filter
    switch (category) {
    case 'All':
      newItems = this.state.items
      break
    case 'Active':
      newItems = this.state.items.filter((item) => item.status === false)
      break
    case 'Completed':
      newItems = this.state.items.filter((item) => item.status === true)
      break
    default:
      newItems = this.state.items
      break
    }
    let foot = ''
    if (this.state.items.length > 0)
      foot = <Footer items={this.state.items} clearCompleted={this.clearCompleted.bind(this)} currentRoute={this.props.params.filter} />

    return (
      <div >
        <Header append={this.appendToItems.bind(this)} items={this.state.items} checkAll={this.checkAll.bind(this)} />
        <ItemList items={newItems} updateStatus={this.updateStatus.bind(this)} updateTask={this.updateTask.bind(this)} deleteTask={this.deleteTask.bind(this)} />
        {foot}
      </div>
    )
  }
}

export default App
