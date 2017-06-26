import { applyMiddleware, createStore, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'

import fetch from './fetchReducer'
import breadcrumb from '../../../dist/reducer'

const loggerMiddleware = createLogger({ collapsed: true })
const rootReducer = combineReducers({ breadcrumb, fetch })
const enhancer = applyMiddleware(loggerMiddleware)

export default createStore(rootReducer, enhancer)
