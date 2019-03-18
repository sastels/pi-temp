import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { App } from '../App'

describe('<App/>', () => {
  afterEach(cleanup)

  it('something renders without crashing', () => {
    render(<div>Hi!</div>)
  })
})
