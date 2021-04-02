import {SET_SAVED} from "../constants";


/*---Interface----*/

interface ISaved{
    brand: ITypeO,
    category: ITypeO,
    code: string,
    images: IImages[],
    price: {
        old_price: number,
        price: number
    },
    shop: ITypeO,
    slug: string,
    warehouse: ITypeO
}

interface ITypeO{
    name: string,
    slug: string
}

interface IImages{
    image_srcset: string,
    original_image: string
}

export function setSaved(saved:ISaved[], lang: string){
    return function (dispatch){
        return dispatch({type:SET_SAVED, payload: saved})
    }
}