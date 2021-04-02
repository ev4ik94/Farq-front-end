import categoriesReducer from './categoriesReducers'
import compareReducer from './compareReducer'
import productReducer from "./productReducer"
import cartReducer from "./cartReducer"
import formReducer from './formReducer'
import brandsReducer from './brandsReducer'
import recentlyReducer from "./recentlyReducer"
import popularReducer from "./popularReducer"
import savedReducer from "./savedReducer"
import {combineReducers} from 'redux'


const rootReducers = combineReducers({
    categories: categoriesReducer,
    compare: compareReducer,
    product: productReducer,
    cart: cartReducer,
    form: formReducer,
    brands: brandsReducer,
    recently: recentlyReducer,
    popular: popularReducer,
    saved: savedReducer
})

export default rootReducers