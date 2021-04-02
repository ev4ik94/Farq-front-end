import {GET_BRANDS, SET_BRANDS} from '../constants'

const brandsReducer = (state=[], action)=>{
    switch(action.type){
        case GET_BRANDS:
            return action.payload
        case SET_BRANDS:
            return action.payload
        default:
            return state
    }
}

export default brandsReducer