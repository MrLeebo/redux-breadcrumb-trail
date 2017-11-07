import { applyMiddleware, createStore, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'

import fetch from './fetchReducer'
import state from './stateReducer'
import { reducer as breadcrumb } from 'redux-breadcrumb-trail'

const loggerMiddleware = createLogger({ collapsed: true })
const rootReducer = combineReducers({ breadcrumb, fetch, state })
const enhancer = applyMiddleware(loggerMiddleware)

export default createStore(rootReducer, enhancer)
