import axios from 'axios'
let getData = () => axios.get('http://localhost:3010/read')
let insertTask = (description) => fetch(`http://localhost:3010/write/${description}`, { method: 'post' }).then((response) => {
  return response.json()
})
let updateStatusData = (id, status) => {
  let data = {
    status: status
  }
  return fetch(`http://localhost:3010/update/${id}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json'
    }
  })
}
let updateDescData = (id, description) => {
  let data = {
    description: description,
  }
  return fetch(`http://localhost:3010/update/${id}`, {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json'
    }
  })
}
let deleteNote = (id) => fetch(`http://localhost:3010/destroy/${id}`, { method: 'delete' })

let updateAllNotes = (status) => fetch(`http://localhost:3010/updateAll/${status}`, {
  method: 'put',
  headers: {
    'Content-type': 'application/json'
  }
})
let deleteCompletedNotes = () => fetch('http://localhost:3010/destroyAll', { method: 'delete' })
module.exports = { getData, insertTask, updateStatusData, updateDescData, deleteNote, updateAllNotes, deleteCompletedNotes}
