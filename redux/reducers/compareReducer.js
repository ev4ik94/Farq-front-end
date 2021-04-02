import {GET_COMPARE, DELETE_COMPARE, SET_COMPARE} from '../constants'

const Compare = {
    category_id: 0,
    count: 0,
    skus: [],
    variations: {}
}

const compareReducer = (state=Compare, action)=>{
    switch(action.type){
        case GET_COMPARE:
            return action.payload
        case SET_COMPARE:
            return action.payload
        case DELETE_COMPARE:
            return action.payload
        default:
            return state
    }
}

export default compareReducer