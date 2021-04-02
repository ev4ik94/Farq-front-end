import {useState, useEffect} from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'


/*----Styles----*/
import classes from '../../../styles/pages-components/cart/cart-product.module.sass'


/*---Components---*/
import {LazyLoadImage} from "../../preloader/Lazy-Load-Image"


/*---Icons----*/
import {Trash, PlusCircleFill} from "react-bootstrap-icons"
import {MinusCircle} from '../../icons/Minus-circle'

import {CostReplace} from "../../secondary-func";


/*----Interface---*/
interface ICart{
    cart_id: number,
    quantity: number,
    sku: ISku
}

interface ISku{
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

export function CartProduct({
                                cart,
                                quantityAdd,
                                quantitySub,
                                deleteProduct,
                                updateCartProduct}:
                                {
                                    cart:ICart[]
                                    quantityAdd: (id:number, quantity: number)=>void,
                                    quantitySub: (id:number, quantity: number)=>void,
                                    deleteProduct: (id:number)=>void,
                                    updateCartProduct: ()=>void
                                }){

const {t} = useTranslation()

    return(
        <div className={`${classes['wrap-cart']} col-lg-11 mx-auto`}>
            {
                cart.map((item, index)=>{

                    return(
                        <div key={index} className={`d-flex`}>
                            <div className={`${classes['picture-product']} col-lg-3`}>
                                <LazyLoadImage image={{
                                    src: item.sku.images[0].original_image,
                                    srcSet: item.sku.images[0].image_srcset,
                                    alt: item.sku.name
                                }}/>
                            </div>
                            <div className={`col-lg-7 d-flex flex-column justify-content-around`}>
                                <Link href={`/product/${item.sku.warehouse.slug}/${item.sku.slug}`}>
                                    <a>{item.sku.name}</a>
                                </Link>
                                <div className={`${classes['control-quantity']} d-flex`} >
                                    <button
                                        className={`${item.quantity>1?classes['active-btn']: classes['disable-btn']}`}
                                        onClick={()=>quantitySub(item.cart_id, item.quantity)}
                                        onMouseLeave={()=>updateCartProduct()}>
                                        <MinusCircle />
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={()=>quantityAdd(item.cart_id, item.quantity)}
                                        onMouseLeave={()=>updateCartProduct()}>
                                        <PlusCircleFill />
                                    </button>
                                </div>
                                <button className={classes['delete-btn']} onClick={()=>deleteProduct(item.cart_id)}>
                                    <Trash />
                                    <span>{t('cart-page.button-remove')}</span>
                                </button>
                            </div>
                            <div className={`col-lg-2 d-flex flex-column`}>
                                <p className={`mb-0 mt-1`}>{CostReplace(item.sku.price.price+'')} UZS</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}