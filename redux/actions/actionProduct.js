import {SET_PRODUCT} from '../constants'

export const setProduct = (product)=>{

    return async function (dispatch){
        dispatch({type:SET_PRODUCT, payload: product?product:null})
    }
}
//
// export const getProduct = ()=>{
//
//     return async function (dispatch){
//
//         if(window.groups===undefined && window.lang!==lang){
//             window.lang = lang
//             await fetch(process.env.API_CATEGORIES[lang])
//                 .then(result=>result.json())
//                 .then(result=>{
//                     window.groups = result
//                     dispatch({type:GET_CATEGORIES, payload: result})
//                 })
//                 .catch(err=>console.log(err.message))
//         }else{
//             dispatch({type:GET_CATEGORIES, payload: window.groups?window.groups:null})
//         }
//
//     }
// }