import {SET_RECENTLY} from '../constants'

const recentlyReducer = (state=[], action)=>{
    switch(action.type){
        case SET_RECENTLY:
            return action.payload
        default:
            return state
    }
}

export default recentlyReducer