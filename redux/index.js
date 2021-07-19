import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import reducer from './reducers'

let middleware = null
//DEV

const store = configureStore({
    reducer,
    ...middleware
})


export default store