import {SET_COMPARE} from '../constants'

/*----interface----*/
interface ICompare{
    brand: string,
    category: {},
    code: string,
    images: {
        image_srcset: string,
        original_image: string
    }[],
    name: string,
    price: {
        price: number,
        old_price: number
    },
    shop: {
        name: string,
        slug: string
    },
    slug: string,
    warehouse: {
        name: string,
        slug: string
    }
}

export const getCompare = (lang)=>{

    return async function (dispatch){
            // window.lang = lang
            // await fetch(process.env.COMPARES_GET_LIST[lang])
            //     .then(result=>result.json())
            //     .then(result=>{
            //         window.compare = result
            //         dispatch({type:GET_COMPARE, payload: result})
            //     })
            //     .catch(err=>console.log(err.message))
    }
}



export const setCompare = (compare:ICompare[], lang:string)=>{
    return async function (dispatch){
        dispatch({type:SET_COMPARE, payload: compare})
    }
}

