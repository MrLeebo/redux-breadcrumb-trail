import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Routes from './components/Routes'
import store from './lib/store'
import './index.css'

ReactDOM.render(
  <Provider store={store}><Routes /></Provider>,
  document.getElementById('root')
)
