import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import {useRouter} from "next/router"

/*----Styles----*/
import classes from '../../../styles/pages-components/cart/form-application.module.sass'

/*---Components---*/
import {CostReplace} from "../../secondary-func";

export function PaymentOrderForm({
                              cartTotal,
                              // handleSubmit,
                              // values,
                              // dataSubmit,
                              // error,
                              // isSubmitting,
                              // touched
                          }:
                              {cartTotal:number,
                                  // handleSubmit:(values:any)=>void,
                                  // values:{},
                                  // dataSubmit: (values: {})=>void,
                                  // error: {},
                                  // isSubmitting: boolean,
                                  // touched: {}


                              }){
    const {t} = useTranslation()
    const router = useRouter()



    // useEffect(()=>{
    //
    //     if(!isSubmitting){
    //         let touch = false
    //         for(let key in touched){
    //             if(touched[key]){
    //                 touch = true
    //                 break
    //             }
    //         }
    //
    //         if(touch){
    //             if(JSON.stringify(error)==='{}'){
    //                 localStorage.setItem('user-form', JSON.stringify(dataSubmit(values)))
    //                 router.push('/payment')
    //
    //             }else{
    //                 console.log(error)
    //             }
    //         }
    //
    //     }
    //
    // }, [isSubmitting])

console.log('CARt total Payment end', cartTotal)
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

            <input className={classes['continue-checkout']} type='submit' value={`${t('cart-page.form-submit')}`} onClick={(e)=>{
                e.preventDefault()
                router.push('/preview-order')
            }}/>
        </div>
    )
}