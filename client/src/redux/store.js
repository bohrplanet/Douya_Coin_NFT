import {createStore} from 'redux'
import web3_reducer from './web3_reducer'

const store = createStore(web3_reducer)

export default store