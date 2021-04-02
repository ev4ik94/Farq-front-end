import {SET_FORM} from '../constants'

export const setForm = (data)=>{
    return async function (dispatch){
        dispatch({type:SET_FORM, payload: data})
    }
}

