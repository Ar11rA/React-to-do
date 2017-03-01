import React from 'react'
import ReactDOM from 'react-dom'
import Checkbox from './Checkbox'
import {shallow} from 'enzyme'

it('has a checkox', () => {
  const checkbox=shallow(<Checkbox checked/>)
  expect(app.node.type).toBe('div')  
})