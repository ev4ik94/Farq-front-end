import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import {useState, useEffect} from 'react'
import Skeleton from "react-loading-skeleton"

/*----Styles----*/
import classes from '../../../styles/pages-components/cart/form-application.module.sass'

/*---Components---*/
import {CostReplace} from "../../secondary-func";

/*---hooks----*/
import {useAuth} from "../../../hooks/authentication.hook"
import {Preloader} from "../../preloader/Preloader";

export function FormApplication({cartTotal, loading}:{cartTotal:number, loading:boolean}){
    const {t} = useTranslation()
    const {checkAuth} = useAuth()
    const [path, setPath] = useState('')

    useEffect(()=>{
        if(checkAuth()){
            setPath('/checkout')
        }else{
            setPath('/identity/checkout_signin')
        }
    }, [])

    return(
        <div className={`${classes['wrap-form']} position-relative`}>

            {loading ? (<>
                <Skeleton />
                <div className={classes['summery-order-cost']}>
                    <div className={`d-flex justify-content-between`}>
                        <div className='col-lg-6'>
                            <Skeleton />
                        </div>
                        <div className='col-lg-6'>
                            <Skeleton />
                        </div>
                    </div>
                    <div className={`d-flex justify-content-between`}>
                        <div className='col-lg-6'>
                            <Skeleton />
                        </div>
                        <div className='col-lg-6'>
                            <Skeleton />
                        </div>
                    </div>
                    <div className={`d-flex justify-content-between`}>
                        <div className='col-lg-6'>
                            <Skeleton />
                        </div>
                        <div className='col-lg-6'>
                            <Skeleton />
                        </div>
                    </div>
                </div>

                <div className={classes['total-cost']}>
                    <div className={`d-flex justify-content-between`}>
                        <div className='col-lg-6'>
                            <Skeleton />
                        </div>
                        <div className='col-lg-6'>
                            <Skeleton />
                        </div>
                    </div>
                </div>

                <Skeleton height={'50px'} className='mt-3'/>

            </>):(<>
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
                <Link href={path}>
                    <a className={classes['continue-checkout']}>
                        {t('cart-page.form-submit')}
                    </a>
                </Link>
            </>)}
        </div>
    )
}