import {GET_CATEGORIES, DELETE_COMPARE, SET_CATEGORIES} from '../constants'

export const getCategories = (lang)=>{

    return async function (dispatch){

        if(window.groups===undefined){
            window.lang = lang

            // await fetch(process.env.API_CATEGORIES[lang])
            //     .then(result=>result.json())
            //     .then(result=>{
            //         window.groups = result
            //
            //         dispatch({type:GET_CATEGORIES, payload: result})
            //     })
            //     .catch(err=>console.log(err.message))
        }else{
            dispatch({type:GET_CATEGORIES, payload: window.groups?window.groups:null})
        }

    }
}

export const setCategories = (categories)=>{

    return async function (dispatch){

        dispatch({type:SET_CATEGORIES, payload: categories})

    }
}