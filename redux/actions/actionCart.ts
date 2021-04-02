import {GET_CART, SET_CART} from '../constants'



/*---Interface----*/
interface ICart{
    items: [],
    total_price: number,
    total_quantity: number
}


export function setCart(cart:ICart, lang?:string){
    return async function (dispatch){
        dispatch({type:SET_CART, payload: cart})
    }
}

