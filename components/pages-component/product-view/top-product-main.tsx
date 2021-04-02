import Slider from "react-slick"
import classes from "../../../styles/pages-components/product/product-view.module.sass"
import {useRouter} from "next/router";
import {useRef, useState, useEffect} from 'react'
import { useTranslation } from 'react-i18next'


/*---Bootstrap Icons----*/
import {ArrowsAngleExpand, ThreeDots} from "react-bootstrap-icons"
import {Cart} from '../../icons/Cart'
import {Save} from '../../icons/Save'
import {Compare} from '../../icons/Compare'

/*---Components---*/
import {CostReplace} from '../../secondary-func'
import Link from "next/link"
import {LazyLoadImage} from "../../preloader/Lazy-Load-Image"
import Skeleton from "react-loading-skeleton"


/*---Bootstrap Components---*/
import {Spinner} from 'react-bootstrap'


/*---Interface---*/



interface IProductInfo{
    id: number,
    brand: {
        name: string,
        slug: string
    },
    code: string,
    images: {
        image_srcset: string,
        original_image: string,
    }[]
    attribute_packages: [],
    name: string,
    price: {
        old_price: number,
        price: number
    },
    shop:{
        name: string,
        slug: string
    },
    warehouse: {
        name: string,
        slug: string
    },
    slug: string,
    breadcrums: IBreadCrumbs[]
}

interface IBreadCrumbs{
    category_id: number,
    name: string
}


interface ISkus{
    id: number,
    price: number,
    text_1: string,
    text_2: string,
    image_urls: IImage[]
}

interface IVariations{
    name: string,
    children: IChild[],
    type: string
}

interface IChild{
    id: number,
    name: string,
    sku_ids: [],
    value: string
}

interface IImage{
    md: string,
    org: string,
    sm: string,
    xs: string
}

export function TopProductMain({
                                   productInfo,
                                   handleShow,
                                   addToCart,
                                   loading,
                                   isAddedCart,
                                   loadingProduct
}:
                                   {
                                       productInfo:IProductInfo,
                                       handleShow:()=>void,
                                       addToCart:(sku_id:number)=>void,
                                       loading: boolean,
                                       isAddedCart: boolean,
                                       loadingProduct: boolean
                                   })
{

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        fade: true,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false
    }

    const router = useRouter()
    const {sku_slug, product_slug} = router.query
    const {t} = useTranslation()
    const [variations, setVariations] = useState<IVariations[]>([])
    const [loadingImage, setLoadingImage] = useState(true)


    const sliderRef = useRef(null)

    const slideNav = (index)=>{
        sliderRef.current.slickGoTo(index)
    }

    useEffect(()=>{
        // if(productInfo!==null&&productInfo.variations){
        //     variationsFilter()
        // }
    }, [productInfo])

    // const variationsFilter = ()=>{
    //     let arrVariations = []
    //     for(let value in productInfo.variations){
    //         let obj = {
    //             type: value,
    //             name: productInfo.variations[value].name,
    //             children: productInfo.variations[value].children
    //         }
    //         arrVariations.push(obj)
    //     }
    //     setVariations(arrVariations)
    //
    // }

    const filterSkusVariations = (skuId:number, value: string)=>{

        // if(productInfo!==null&&productInfo.skus){
        //     let product = productInfo.skus.filter(item=>item.id===skuId)
        //     if(product.length){
        //         return product[0][value]?product[0][value]:[]
        //     }
        // }

        return productInfo!==null && productInfo.images ? productInfo.images: []

    }

    const IsLoadingImage = (src)=>{
        let imgUp = document.createElement('img');
        imgUp.src = src
        imgUp.onload = function() {
            setLoadingImage(false)
        }
    }

    // if(productInfo!==null && loadingProduct){
    //     return(
    //         <div className='d-flex pt-3' style={{minHeight: '500px'}}>
    //             <div className='col-lg-7 pl-0'>
    //                 <Skeleton width='100%' height={'100%'}/>
    //             </div>
    //             <div className='col-lg-5 d-flex flex-column'>
    //                 <Skeleton width='60%'/>
    //                 <Skeleton width='40%' />
    //                 <div className='row mt-3'>
    //                     <div className='col-4'>
    //                         <Skeleton height={'50px'}/>
    //                     </div>
    //                     <div className='col-4'>
    //                         <Skeleton height={'50px'}/>
    //                     </div>
    //                     <div className='col-4'>
    //                         <Skeleton height={'50px'}/>
    //                     </div>
    //                 </div>
    //                 <Skeleton height={'50px'} className='mt-3'/>
    //                 <div className='row pt-3'>
    //                     <div className='col-6'>
    //                         <Skeleton height={'50px'}/>
    //                     </div>
    //                     <div className='col-6'>
    //                         <Skeleton height={'50px'}/>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    if(productInfo!==null){

        return(
            <div className={`${classes['top-product-wrap']} d-flex`}>

                <div className={`col-lg-7 pl-0 ${classes['wrap-image-preview']}`}>
                    <div className={`position-relative`}>
                        <button className={`position-absolute`} onClick={handleShow}>
                            <ArrowsAngleExpand />
                        </button>
                        <Slider {...settings} ref={sliderRef} className={'slider-for'} id={'main-slide-view'}>
                            {/*{*/}
                            {/*    (filterSkusVariations(Number(sku_slug),'image_urls')!==''?filterSkusVariations(Number(sku_slug),'image_urls'):[]).map((item, index)=>{*/}
                            {/*        return(*/}
                            {/*            <div key={index}>*/}
                            {/*                <LazyLoadImage image={{*/}
                            {/*                    src: item.original_image,*/}
                            {/*                    srcSet: item.image_srcset,*/}
                            {/*                    alt: ''*/}
                            {/*                }}/>*/}
                            {/*            </div>*/}
                            {/*        )*/}
                            {/*    })*/}
                            {/*}*/}

                            <div>
                                <LazyLoadImage image={{
                                    src: productInfo!==null && productInfo.images.length?productInfo.images[0].original_image:'',
                                    srcSet: productInfo!==null && productInfo.images.length?productInfo.images[0].image_srcset:'',
                                    alt: ''
                                }}/>
                            </div>

                        </Slider>
                    </div>

                    <div className={`${classes['slider-nav']}`}>

                        <div className={`d-flex align-items-center`} >
                            {
                                filterSkusVariations(Number(sku_slug),'image_urls').map((item,index)=>{
                                    if(index<5){
                                        return(
                                            <div onClick={()=>slideNav(index)} key={index}>
                                                <LazyLoadImage image={{
                                                    src: item.original_image,
                                                    srcSet: item.image_srcset,
                                                    alt: ''
                                                }}/>
                                            </div>
                                        )
                                    }else if(index===6){
                                        return(
                                            <button onClick={handleShow} key={index} className={`${classes['btn-more-view']}`}>
                                                <ThreeDots />
                                            </button>
                                        )
                                    }
                                })
                            }

                            {

                            }
                        </div>
                    </div>
                </div>

                <div className={`col-lg-5 ${classes['info-product-cost-variations']}`}>
                    <div className={`${classes['block-payment-buy']}`}>
                        <p className={`${classes['text-cost']}`}>{CostReplace(productInfo.price.price+'')} UZS</p>
                        <div className={`${classes['variations-block']} mb-3`}>
                            {
                                variations.map((item,index)=>{
                                        return(
                                            <div key={index}>
                                                {/*<p className='mb-0'>{item.name}:</p>*/}
                                                <p className='mb-0'>{productInfo.name}</p>
                                                <div className={`${classes['block-colors']}`}>
                                                    {
                                                        item.children.map((child, index)=>{

                                                            return(

                                                                <Link href={`/product/${product_slug}/${Array.from(child.sku_ids)[0]}`} key={index}>
                                                                    <a className='col-lg-4 d-block pl-0'>
                                                                        <div className={`${classes['item-color']} 
                                                                ${Number(sku_slug)===Array.from(child.sku_ids)[0]?`${classes['active']}`:''}`}
                                                                             >
                                                                            <div>
                                                                                <p className={'font-weight-bold mb-0'}>{child.name}</p>
                                                                            </div>
                                                                            <p className='mb-0 mt-1'>{
                                                                                child.sku_ids.map((sku,index)=>{
                                                                                    return(<span key={index}>{CostReplace(filterSkusVariations(Number(sku), 'price')+'')}</span>)
                                                                                })
                                                                            } UZS</p>
                                                                        </div>
                                                                    </a>
                                                                </Link>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )


                                })
                            }
                        </div>
                        <button
                            onClick={()=>addToCart(Number(sku_slug))}
                            style={{opacity: loading?'.8':'1'}}
                            className={`position-relative add-cart-button ${isAddedCart?'added-cart':''}`}>
                            <Cart />
                            {
                                isAddedCart?<span>{t('button-added-cart')}</span>:<span>{t('cart-button')}</span>
                            }
                            <Spinner animation="border" role="status" className={`${loading?'d-block':'d-none'} ${classes['spinner-button']}`}>
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </button>
                        <div className={`d-flex ${classes['buttons-save-compare']}`}>
                            <button className='add-save-button'>
                                <Save />
                                {t('button-save')}
                            </button>
                            <button className='add-compare-button'>
                                <Compare />
                                {t('compare-button.compare')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(<></>)





}