import {SET_POPULAR} from '../constants'

const popularReducer = (state=[], action)=>{
    switch(action.type){
        case SET_POPULAR:
            return action.payload
        default:
            return state
    }
}

export default popularReducer