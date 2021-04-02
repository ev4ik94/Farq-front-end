import { useTranslation } from 'react-i18next'
import {useRouter} from "next/router";
import useHttp from "../../hooks/http.hook";


/*----Bootstrap---*/
import {Modal, Spinner} from "react-bootstrap"

/*---Styles----*/
import classes from "../../styles/pages-components/alerts/add-to-cart.module.sass"

/*---Components---*/
import {CostReplace} from "../secondary-func"
import {LazyLoadImage} from "../preloader/Lazy-Load-Image"

/*----Icons----*/
import {CheckCircle} from "react-bootstrap-icons"

/*---Interfaces---*/

interface ICartObj{
    product: IProduct,
    cart: ICart
}

interface IProduct{
    cart_id: number,
    quantity: string,
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

interface ICart{
    totalCount: number,
    totalPrice: number
}

export function AddToCartModal({
                                   cartObj,
                                   onHide,
                                   show,
                                   catId}:
                                   {
                                       cartObj:ICartObj,
                                       onHide:()=>void,
                                       show: boolean,
                                       catId?:number|null
                                   }){

    const {t} = useTranslation()
    const router = useRouter()


    if(cartObj && cartObj.product && cartObj.cart){

        return(
            <Modal show={show} size="lg" onHide={onHide}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <div className={`${classes['alert-add-cart']} d-flex`}>
                        <div>
                            <CheckCircle />
                        </div>
                        <div>
                            <p className='mb-0'>{t('alert-cart.message')}</p>
                        </div>
                    </div>
                    <div className={`${classes['body-modal-cart']} d-flex`}>
                        <div className={classes['picture-product']}>
                            <LazyLoadImage image={{
                                src: cartObj.product.sku.images[0].original_image,
                                srcSet: cartObj.product.sku.images[0].image_srcset,
                                alt: cartObj.product.sku.name
                            }}/>
                        </div>

                        <div className={`${classes['description-product']} col-lg-5 d-flex flex-column justify-content-center`}>
                            <p>{cartObj.product.sku.name}</p>
                            <p className={`font-weight-bold`}>{CostReplace(cartObj.product.sku.price.price + '')} UZS</p>
                        </div>

                        <div className={`${classes['buttons-modal']} d-flex flex-column justify-content-center`}>
                            <p>{t('alert-cart')} ({cartObj.cart.totalCount?cartObj.cart.totalCount:0}),&nbsp;
                                <span className='font-weight-bold'>{CostReplace(cartObj.cart.totalPrice?cartObj.cart.totalPrice+'':'')} UZS</span></p>
                            <div className={`${classes['buttons-group']} d-flex`}>
                                <button onClick={()=>router.push('/cart')}>{t('alert-cart.button1')}</button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }

    return(<></>)
}
