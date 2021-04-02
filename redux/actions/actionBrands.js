import {GET_BRANDS, SET_BRANDS} from '../constants'

export const getBrands = ()=>{

    return async function (dispatch){

        // await fetch(process.env.API_BRANDS['ru'])
        //     .then(result=>result.json())
        //     .then(result=>{
        //         console.log('get brands')
        //         dispatch({type:GET_BRANDS, payload: result})
        //     })
        //     .catch(err=>console.log(err.message))

    }
}

export const setBrands = (brands)=>{

    return async function (dispatch){

        dispatch({type:SET_BRANDS, payload: brands})

    }
}