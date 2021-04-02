var formData = {
    name: '',
    lastName: '',
    phone: '',
    email: '',
    comment: '',
    address: '',
    delivery_type: 'DELIVERY',
    payment_type: 'PAYMENT_TERMINAL',
    is_lifting: true,
    date_delivery: ''
}

import {SET_FORM} from '../constants'

const formReducer = (state=formData, action)=>{
    switch(action.type){
        case SET_FORM:
            return action.payload
        default:
            return state
    }
}

export default formReducer