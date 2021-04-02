import Link from 'next/link'
import {useRouter} from "next/router"
import {useTranslation} from "react-i18next"

/*---styles---*/
import classes from '../../../styles/pages-components/recently-viewed/recently-list.module.sass'


/*---Components----*/
import {LazyLoadImage} from "../../preloader/Lazy-Load-Image"
import {Rating} from '../Rating'
import {CostReplace} from "../../secondary-func"
import {Preloader} from "../../preloader/Preloader"

/*-----Icons----*/
import {Cart} from '../../icons/Cart'
import {Save} from "../../icons/Save"
import {Compare} from "../../icons/Compare"
import {X} from 'react-bootstrap-icons'


/*---Hooks-----*/
import {AxiosApi} from "../../../hooks/axios.hook"

/*---Interface---*/
interface IProducts{
    brand: ITypeO,
    name: string,
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

interface ICart{
    cart_id: number,
    quantity: number,
    sku: IProducts
}


export function ProductsList({
                                 products,
                                 save,
                                 deleteProduct,
                                 recentlyToggle,
                                 cart,
                                 setCart,
                                 addToCart,
                                 addToCompare,
                                 deleteCompare,
                                 addToSave,
                                 compare
                            }:
                                 {
                                     products: IProducts[],
                                     save: IProducts[],
                                     deleteProduct:(type:string, item:number, warehouse_slug:string, slug:string)=>void,
                                     recentlyToggle: boolean,
                                     cart: ICart[],
                                     setCart: (value: [])=>void,
                                     addToCart: (item:number,warehouse_slug: string, slug: string)=>void,
                                     addToCompare: (item:number,warehouse_slug: string, slug: string)=>void,
                                     deleteCompare: (item:number, warehouse_slug: string, slug: string)=>void,
                                     addToSave: (item:number, warehouse_slug: string, slug: string)=>void,
                                     compare:IProducts[]
                                 }){

    const {t} = useTranslation()
    const router = useRouter()

    const isAddedCart = (warehouse_slug, slug)=>{

        for(let i=0; i<cart.length; i++){
            if(cart[i].sku.warehouse.slug===warehouse_slug && cart[i].sku.slug===slug){
                return true
            }
        }

        return false


    }

    const isCompare = (warehouse_slug, slug)=>{

        for(let i=0; i<compare.length; i++){
            if(compare[i].warehouse.slug===warehouse_slug && compare[i].slug===slug){
                return true
            }
        }
        return false
    }

    const isSave = (warehouse_slug, slug)=>{
        save.forEach(item=>{
            if(item.warehouse.slug===warehouse_slug && item.slug===slug){
                return true
            }
        })
        return false
    }






    return(
        <>
            {
                (products || []).map((item, index)=>{
                    return(
                        <div className={`col-lg-4 mt-3`} style={{padding: '0px 30px'}} key={index}>

                            <div className={`${classes['item-product-recently-saved']} position-relative`}>
                                <div className={`${classes['preloader-item']} position-absolute w-100 h-100`} data-item={index}>
                                    <Preloader/>
                                </div>
                                <button className={`float-right ${classes['button-delete']}`}
                                        onClick={()=>deleteProduct('', index, item.warehouse.slug, item.slug)}><X /></button>
                                <div className={`${classes['product-image']}`}>
                                    <Link href={`/product/${item.warehouse.slug}/${item.slug}`}>
                                        <a>
                                            <div>
                                                <LazyLoadImage image={{
                                                    src: item.images[0].original_image,
                                                    srcSet: item.images[0].image_srcset,
                                                    alt: item.name
                                                }}/>
                                            </div>
                                        </a>
                                    </Link>
                                </div>

                                <div className={`${classes['item-product-title']}`}>
                                    <p className='mb-0'>
                                        <Link href={`/product/${item.warehouse.slug}/${item.slug}`}>
                                            <a>
                                                {item.name}
                                            </a>
                                        </Link>
                                    </p>
                                    <Rating/>
                                    <p>{CostReplace(item.price.price + '')} UZS</p>
                                </div>

                                <div className={`${classes['item-buttons']} d-flex justify-content-between flex-wrap`}>
                                    {
                                        isAddedCart(item.warehouse.slug, item.slug)
                                            ?(<button className={`
                                        ${recentlyToggle?'col-lg-12':classes['w-45']} 
                                        d-flex align-items-center justify-content-center add-cart-button added-cart`}
                                                      onClick={()=>router.push('/cart')}
                                            >
                                                <Cart />
                                                {t('button-added-cart')}
                                            </button>)
                                            :(
                                                <button className={`
                                        ${recentlyToggle?'col-lg-12':classes['w-45']} 
                                        d-flex align-items-center justify-content-center add-cart-button`}
                                        onClick={()=>addToCart(index,item.warehouse.slug, item.slug)}
                                        >
                                            <Cart />
                                            {t('cart-button')}
                                        </button>)
                                    }
                                    <button
                                        className={`d-flex align-items-center justify-content-center 
                                        add-compare-button mr-3 ${classes['w-45']} ${isCompare(item.warehouse.slug, item.slug)?'added-compare':''}`}
                                        onClick={()=>{
                                            if(isCompare(item.warehouse.slug, item.slug)){
                                                deleteCompare(index,item.warehouse.slug, item.slug)
                                            }else{
                                                addToCompare(index,item.warehouse.slug, item.slug)
                                            }

                                        }}
                                    >
                                        <Compare />
                                        {t('compare-button.compare')}
                                    </button>
                                    <button
                                        className={`align-items-center justify-content-center add-save-button ${classes['w-45']} 
                                        ${!recentlyToggle?'d-none':'d-flex'} 
                                        ${isSave(item.warehouse.slug, item.slug)?'added-save':''}`}
                                        onClick={()=>{
                                            if(isSave(item.warehouse.slug, item.slug)){
                                                deleteProduct('save_delete', index,item.warehouse.slug, item.slug)
                                            }else{
                                                addToSave(index,item.warehouse.slug, item.slug)
                                            }
                                        }}
                                    >
                                        <Save />
                                        {t('button-save')}
                                    </button>
                                </div>

                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}