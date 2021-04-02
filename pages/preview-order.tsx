import {useState, useEffect} from 'react'
import {useTranslation} from "react-i18next"
import Link from 'next/link'
import {useRouter} from "next/router"


/*---Styles----*/
import classes from '../styles/pages-components/preview-order/preview-order.module.sass'

/*---Components---*/
import MainComponent from "../components/Main-Component"
import {CostReplace} from "../components/secondary-func"
import {Tracker} from "../components/pages-component/checkout/tracker"
import {OrderForm} from "../components/pages-component/checkout/order-form"
import {LazyLoadImage} from "../components/preloader/Lazy-Load-Image"


/*---Bootstrap----*/
import {Container} from "react-bootstrap"

/*----Redux----*/
import {connect} from 'react-redux'
import {router} from "next/client";


interface ICart{
    total_price: number,
    quantity: number,
    items: ISkus[]
}

interface ISkus {
    id: number,
    brand: {},
    category?: {},
    code: string,
    images: {
        image_srcset: string,
        original_image: string,
    }[],
    name: string,
    price: {
        old_price: number|null,
        price: number
    },
    slug: string,
    warehouse: {
        name: string,
        slug: string
    }
}


function PreviewOrder({cartObj}:{cartObj:ICart}){

    const {t} = useTranslation()
    const [products, setProducts] = useState([])
    const [totalCost, setTotalCost] = useState(0)
    const [dataForm, setDataForm] = useState(null)
    const router = useRouter()

    useEffect(()=>{
        if(!cartObj || JSON.stringify(cartObj)==='[]'){
            // getCart('ru')
        }else{
            setProducts(cartObj && cartObj.items?cartObj.items:[])
            setTotalCost(cartObj && cartObj.total_price?cartObj.total_price:0)
        }
        console.log('CartObj', cartObj)

    }, [cartObj])

    useEffect(()=>{
        if(window!==undefined){
            const data = localStorage.getItem('user-form')

            if(data && data!==null){
                setDataForm(JSON.parse(data))
            }else{
                setDataForm({
                    first_name: 'Evelina',
                    last_name: 'Inogamova',
                    address: 'Uchtepa 25-5-87',
                    country: 'Uzbekistan',
                    city: 'Tashkent',
                    phone: '+99893 553-12-50'
                })
                // router.push('/')
            }
        }

    }, [])


    return(
        <MainComponent>

            <Container fluid className='mt-3'>
                <Tracker />

                <div className={`${classes['preview-order-wrap']} d-flex`}>
                    <div className='col-lg-9'>
                        <div className={`d-flex align-items-center justify-content-between mt-3`}>
                            <h3>{t('preview.title-address-shipping')}</h3>
                            <p className='mb-0'>
                                <Link href={'/checkoutпш'}>
                                    <a>Edit address</a>
                                </Link>
                            </p>
                        </div>
                        <div className={`${classes['block-address-preview']} mt-3`}>
                            {
                                dataForm && dataForm!==null?(<>
                                    <p className='font-weight-bold'>{`${dataForm.first_name?dataForm.first_name:''} 
                                ${dataForm.last_name?dataForm.last_name:''}`} - {dataForm.address?dataForm.address:''}</p>
                                    <p>{dataForm.address?dataForm.address:''}</p>
                                    <p>{dataForm.country?dataForm.country:''}, {dataForm.city?dataForm.city:''}</p>
                                </>):('')
                            }
                        </div>
                        <div className='mt-3'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <h3>{t('preview.title-shipping-details')}</h3>
                                <p className='mb-0'>
                                    <Link href={'/cart'}>
                                        <a>Edit delivery</a>
                                    </Link>
                                </p>
                            </div>
                            <div className={`${classes['product-list-order']} mt-3`}>
                                {
                                    products.map((item, index)=>{
                                        return(
                                            <div className='d-flex' key={index}>
                                                <div className={`${classes['image-product-order']} col-lg-3`}>
                                                    <Link href={`/product/${item.sku.warehouse.slug}/${item.sku.slug}`}>
                                                        <a>
                                                            <LazyLoadImage image={{
                                                                src: item.sku.images[0].original_image,
                                                                srcSet: item.sku.images[0].image_srcset,
                                                                alt: item.sku.name
                                                            }}/>
                                                        </a>
                                                    </Link>
                                                </div>
                                                <div className={`${classes['name-cost-order']} col-lg-7`}>
                                                    <Link href={`/product/${item.sku.warehouse.slug}/${item.sku.slug}`}>
                                                        <a>{item.sku.name}</a>
                                                    </Link>
                                                    <p>{t('preview.text3')}: <span>{item.quantity} шт</span></p>
                                                </div>
                                                <div className='col-lg-2'>
                                                    <p className='font-weight-bold'>{CostReplace(item.sku.price.price+'')} UZS</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>

                            <div className={`mt-3`}>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <h4>{t('preview.title-payment-method')}</h4>
                                    <p className='mb-0'>
                                        <Link href={'/'}>
                                            <a>Edit payment</a>
                                        </Link>
                                    </p>
                                </div>
                                <div className={`${classes['payment-method']}`}>
                                    <p>Оплата наличными</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-3 pt-3'>
                        <div className={`${classes['wrap-form']}`}>
                            <h3 className={`font-weight-bold`}>{t('cart-page.form-application1')}</h3>
                            <div className={classes['summery-order-cost']}>
                                <div className={`d-flex justify-content-between`}>
                                    <p className={`mb-0`}>{t('cart-page.form-application2')}</p>
                                    <p className={`mb-0`}>{CostReplace(totalCost+'')} UZS</p>
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
                                    <p className={`mb-0`}>{CostReplace(totalCost+'')} UZS</p>
                                </div>
                            </div>

                            <button className={classes['continue-checkout']} type='submit' onClick={(e)=>{
                                e.preventDefault()

                            }}>{`${t('preview.finish-order-button')}`}</button>
                        </div>
                    </div>
                </div>


            </Container>
        </MainComponent>
    )
}

const mapStateToProps = state=>({
    cartObj: state.cart
})
//
// const mapDispatchToPRops = {
//     getCart
//
// }

export default connect (mapStateToProps)(PreviewOrder)
