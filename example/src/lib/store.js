import { createStore, combineReducers } from 'redux'

import fetch from './fetchReducer'
import breadcrumb from '../../../dist/reducer'

const rootReducer = combineReducers({ breadcrumb, fetch })
export default createStore(rootReducer)
