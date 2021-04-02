import {useRouter} from "next/router"
import {useEffect, useState} from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'



/*---Components---*/
import MainComponent from "../../../../components/Main-Component"
import {TopProductMain} from "../../../../components/pages-component/product-view/top-product-main"
import {Accordion} from '../../../../components/pages-component/product-view/acordion'
import {ModalViewImage} from "../../../../components/pages-component/product-view/modal-view-image"
import {AddToCartModal} from '../../../../components/alerts/add-to-cart'
import {BreadCrumbs} from "../../../../components/pages-component/BreadCrumbs"

/*---Styles----*/
import classes from '../../../../styles/pages-components/product/product-view.module.sass'

/*---Bootstrap---*/
import {Container} from 'react-bootstrap'

/*---Bootstrap Icons---*/
import {Star} from 'react-bootstrap-icons'

/*----Hooks----*/
import {AxiosApi} from "../../../../hooks/axios.hook"


/*----Redux----*/
import {connect} from 'react-redux'
import {setProduct} from "../../../../redux/actions/actionProduct"
import {setCart} from '../../../../redux/actions/actionCart'

/*---Interfaces---*/

interface ICategories {
    id: number,
    children: ICategories[],
    description: string,
    icon_url: {},
    image_urls: IImages,
    name: string,
    parent_id: number
}

interface IImages {
    md: string,
    org: string,
    sm: string,
    xs: string
}


interface IProduct{
    id: number,
    brand: {
        name: string,
        slug: string
    },
    code: string,
    attribute_packages: [],
    name: string,
    images: {
        image_srcset: string,
        original_image: string,
    }[],
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




function ProductView({
                         //serverData,
                         setProduct,
                         product,
                         setCart
                    }:{
                        //serverData:IProducts | null,
                        setProduct: (product:{})=>void,
                        product: IProduct | null,
                        setCart:(value:any)=>void
                    }){

    const router = useRouter()
    const {sku_slug, product_slug, sku_change} = router.query
    const [productObj, setProductObj] = useState<IProduct>(null)
    const [show, setShow] = useState(false)
    const [addCart, setCartObj] = useState(null)
    const [showCartModal, setCartShowCart] = useState(false)
    const [isAddedCart, setAddedCart] = useState(false)
    const [mount, setMount] = useState(true)
    const {request, loading} = AxiosApi()


    // const {request} = useHttp()
    const [loadingCart, setLoadingCart] = useState(false)
    const [loadingProduct, setLoadingProduct] = useState(false)

    const {t} = useTranslation()


    useEffect(()=>{

        if(mount){
            if(JSON.stringify(product)==='{}'){
                getProduct()
            }else{
                if(product_slug!==product.slug){
                    getProduct()
                }else{
                    setProductObj(product)
                    getCart(Number(sku_slug))
                }
            }
            setMount(false)
        }

    }, [mount])

    const getProduct = async()=>{
        setLoadingProduct(true)
       // await request(`${process.env.API_PRODUCT_VIEW['ru']}/${product_slug}`)
       //     .then(result=>{
       //         setProductObj(result)
       //         setProduct(result)
       //          getCart(Number(sku_slug))
       //         setLoadingProduct(false)
       //     })
       //     .catch(err=> {
       //         setLoadingProduct(false)
       //         console.log('')
       //     })

        await request(`${process.env.API_PRODUCT_VIEW['ru']}/${product_slug}/${sku_slug}`)
            .then(result=>{
                setProductObj(result.data)
                setProduct(result)
                getCart(Number(sku_slug))
                setLoadingProduct(false)
            })

    }

    const addToCart = async(sku_id)=>{
        if(!isAddedCart){
            setLoadingCart(true)
            // await request(`${process.env.ADD_TO_CART['ru']}/${sku_slug}`)
            //     .then(result=>{
            //         let data = result.skus.filter(item=>item.sku_id===sku_id).length?result.skus.filter(item=>item.sku_id===sku_id)[0]:{}
            //
            //         const dataO = {product:data, cart:{
            //                 totalCount: result.skus.length,
            //                 totalPrice: result.total
            //             }}
            //             console.log(dataO)
            //         setCart({
            //             skus: result.skus,
            //             total: result.total
            //         })
            //         setCartObj(dataO)
            //         setAddedCart(true)
            //         getCart(sku_id)
            //         setLoadingCart(false)
            //         ShowHandle()
            //     })
        }

    }


    const getCart = async(sku_id)=>{
        // await request(`${process.env.GET_CART['ru']}`)
        //     .then(result=>{
        //         const cartArr = result.cart && result.cart.skus?result.cart.skus:[]
        //         if(cartArr.filter(item=>item.id===sku_id).length){
        //             setAddedCart(true)
        //         }
        //     })
    }



    const handleClose = () => setShow(false)
    const HideHandle = () => setCartShowCart(false)
    const ShowHandle = () => setCartShowCart(true)
    const handleShow = () => setShow(true)

    const imagesFilter = ()=>{

        //const arrayImages = productObj!==null&& productObj.images? productObj.skus.filter(item=>item.id===Number(sku_slug)):[]
        //return arrayImages.length?arrayImages[0].image_urls:[]
        return productObj!==null ? productObj.images : []
    }

    if(productObj && productObj!==null){

    return(
        <MainComponent>
            <ModalViewImage images={imagesFilter()} show={show} handleClose={handleClose}/>
            <AddToCartModal cartObj={addCart!==null?addCart:{}} show={showCartModal} onHide={HideHandle}
                            catId={productObj!==null&&productObj.breadcrums&&productObj.breadcrums.length?productObj.breadcrums[productObj.breadcrums.length-1].category_id:null}/>
            <Container>
                <div className={`d-flex ${classes['bread-crumbs']}`}>
                    <p>
                        <Link href={'/'}>
                            <a href="">Farq</a>
                        </Link>
                    </p>
                    {
                        (productObj!==null && productObj.breadcrums?productObj.breadcrums:[]).map((item, index, array)=>{

                            return(
                                <p key={item.category_id}>
                                    <Link href={`/${array.length === (index+1)?'products':'categories'}/${item.category_id}${array.length === (index+1)?`?category_id=${item.category_id}`:''}`}>
                                        <a href="">{item.name}</a>
                                    </Link>
                                </p>
                            )
                        })
                    }

                </div>
                <div className={`${classes['product-info-review-block']}`}>
                    <div className={`mt-1`}>
                        <p className='mb-0'>{productObj!==null&&productObj.name?productObj.name:''}</p>
                    </div>

                    <div className={`${classes['review-block']} d-flex mt-1`}>
                        <div className={`${classes['rating-block']} d-flex`}>
                            <button>
                                <Star />
                            </button>
                            <button>
                                <Star />
                            </button>
                            <button>
                                <Star />
                            </button>
                            <button>
                                <Star />
                            </button>
                            <button>
                                <Star />
                            </button>
                        </div>
                        <div className={`${classes['reviews-info']} d-flex`}>
                            <button className={`${classes['review-buttons-item']}`}>
                                4.5 (14 Reviews)
                            </button>
                            <button className={`${classes['review-buttons-item']}`}>
                                25 Answered Questions
                            </button>
                            <p className='mb-0 pl-1'><span className='font-weight-bold'>{t('model')}:</span> {productObj.code}</p>
                        </div>
                    </div>
                </div>
                <TopProductMain
                    productInfo={productObj?productObj:null}
                    handleShow={handleShow}
                    addToCart={addToCart}
                    loading={loadingCart}
                    isAddedCart={isAddedCart}
                    loadingProduct={loadingProduct}
                />
                <div className={`${classes['description-block']} mt-5`}>
                    <h2>{t('product-view.overview')}</h2>
                    <p>
                        {/*{productObj!==null && productObj.skus && productObj.skus.filter(item=>item.id===Number(sku_slug)).length?*/}
                        {/*    productObj.skus.filter(item=>item.id===Number(sku_slug))[0].text_1:''}*/}
                    </p>
                </div>
                <Accordion characters={productObj!==null && productObj.attribute_packages?productObj.attribute_packages:[]}/>
            </Container>

        </MainComponent>
    )
    }

    return <></>
}

const mapStateToProps = state=>({
    categories: state.categories,
    product: state.product
})

const mapDispatchToPRops = {
    setProduct,
    setCart

}

export default connect (mapStateToProps, mapDispatchToPRops)(ProductView)


