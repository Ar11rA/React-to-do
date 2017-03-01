import React, { Component } from 'react'
import { getData, insertTask, updateStatusData, updateDescData, deleteNote, updateAllNotes, deleteCompletedNotes } from './Api'
import Header from '../Header/Header.jsx'
import ItemList from '../ItemList/ItemList.jsx'
import Footer from '../Footer/Footer.jsx'
import './App.css'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: []
    }
  }
  componentDidMount() {
    getData().then((response) => {
      this.setState({
        items: response.data
      })
    })
  }

  appendToItems(description) {
    const prevItems = this.state.items
    insertTask(description)
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
    updateStatusData(id, status).then(() => {
      let index = prevItems.findIndex(x => x.id === id)
      prevItems[index].status = status
      this.setState({
        items: prevItems
      })
    })
  }
  updateTask(id, description) {
    const prevItems = this.state.items
    updateDescData(id, description).then(() => {
      let index = prevItems.findIndex(x => x.id === id)
      prevItems[index].description = description
      this.setState({
        items: prevItems
      })
    })
  }
  deleteTask(id) {
    const prevItems = this.state.items.filter((item) => item.id !== id)
    deleteNote(id).then(() => {
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
    updateAllNotes(status).then(() => {
      this.setState({
        items: prevItems
      })
    })
  }
  clearCompleted() {
    const prevItems = this.state.items.filter((item) => item.status === false)
    deleteCompletedNotes().then(
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
