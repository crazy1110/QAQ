import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import {createStore} from 'redux'
import createBrowserHistory from 'history/createBrowserHistory'
import App from './routes/app'
import Reducer from './reducers/index'
import './reset.css'

const store = createStore(Reducer)
ReactDOM.render((
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <App />
    </Router>
  </Provider>
), document.getElementById('root'))
