import {SET_POPULAR} from '../constants'

/*----interface----*/
interface IPopular{
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


export function setPopularProducts(popular:IPopular[], lang?:string){
    return function (dispatch){
        dispatch({type:SET_POPULAR, payload: popular})
    }
}