import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import {useRouter} from "next/router"

/*----Styles----*/
import classes from '../../../styles/pages-components/cart/form-application.module.sass'

/*---Components---*/
import {CostReplace} from "../../secondary-func"

/*---Hooks---*/
import {AxiosApi} from "../../../hooks/axios.hook"


export function OrderForm({
                              cartTotal,
                              handleSubmit,
                              values,
                              dataSubmit,
                              errors,
                              isSubmitting,
                              touched
}:
                              {cartTotal:number,
                                  handleSubmit:(values:any)=>void,
                                  values:{},
                                  dataSubmit: (values: {})=>void,
                                  errors: {},
                                  isSubmitting: boolean,
                                  touched: {}


                              }){
    const {t} = useTranslation()
    const router = useRouter()
    const {request, loading} = AxiosApi()



    useEffect(()=>{

        if(!isSubmitting){
            let touch = false
            for(let key in touched){
                if(touched[key]){
                    touch = true
                    break
                }
            }

            if(touch){
                if(JSON.stringify(errors)==='{}'){
                    sendOrderForm(dataSubmit(values))
                }else{
                    console.log(errors)
                }
            }

        }

    }, [isSubmitting])

    const sendOrderForm = async(data)=>{
        const data_send = {
            address: 'Tashkent Uzbekistan',
            country_id: 0,
            delivery_type: data.delivery_type,
            district_id: 0,
            first_name: data.name,
            last_name: data.lastName,
            payment_type: data.payment_type,
            region_id: 0,
            phone: data.phone,
            is_lifting: data.is_lifting,
            email: data.email
        }

        router.push('/payment')
        localStorage.setItem('user-form', JSON.stringify(data_send))
        // await request(`${process.env.ORDER_SEND['ru']}`, 'POST', data_send)
        //     .then(result=>{
        //         console.log(result)
        //         router.push('/payment')
        //         localStorage.setItem('user-form', JSON.stringify(dataSubmit(values)))
        //     }).catch(e=>console.log(e))

    }


    return(
        <div className={`${classes['wrap-form']}`}>
            <h3 className={`font-weight-bold`}>{t('cart-page.form-application1')}</h3>
            <div className={classes['summery-order-cost']}>
                <div className={`d-flex justify-content-between`}>
                    <p className={`mb-0`}>{t('cart-page.form-application2')}</p>
                    <p className={`mb-0`}>{CostReplace(cartTotal+'')} UZS</p>
                </div>
                <div className={`d-flex justify-content-between`}>
                    <p className={`mb-0`}>{t('cart-page.form-application3')}</p>
                    <p className={`mb-0`}>{'0'} UZS</p>
                </div>
                <div className={`d-flex justify-content-between`}>
                    <p className={`mb-0`}>{t('cart-page.form-application4')}</p>
                    <p className={`mb-0`}>{'Free'}</p>
                </div>
            </div>

            <div className={classes['total-cost']}>
                <div className={`d-flex justify-content-between`}>
                    <p className={`mb-0`}>{t('cart-page.form-application5')}</p>
                    <p className={`mb-0`}>{CostReplace(cartTotal+'')} UZS</p>
                </div>
            </div>

            <button className={classes['continue-checkout']} type='submit' onClick={(e)=>{
                e.preventDefault()
                handleSubmit(values)
            }}>{`${t('cart-page.form-submit')}`}</button>
        </div>
    )
}