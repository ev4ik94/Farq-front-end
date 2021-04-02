import {GET_CATEGORIES, SET_CATEGORIES} from '../constants'

const categoriesReducer = (state=[], action)=>{
    switch(action.type){
        case GET_CATEGORIES:
            return action.payload
        case SET_CATEGORIES:
            return action.payload
        default:
            return state
    }
}

export default categoriesReducer