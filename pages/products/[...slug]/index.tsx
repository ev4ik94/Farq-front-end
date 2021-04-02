import {useRouter} from "next/router"
import {useState, useEffect} from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'


/*---Components----*/
import MainComponent from "../../../components/Main-Component"
import {CostReplace} from '../../../components/secondary-func'
import {AddToCartModal} from "../../../components/alerts/add-to-cart"
import {LazyLoadImage} from "../../../components/preloader/Lazy-Load-Image"
import {BreadCrumbs} from "../../../components/pages-component/BreadCrumbs"
import {Preloader} from "../../../components/preloader/Preloader"

/*----Hooks----*/
import {AxiosApi} from "../../../hooks/axios.hook"


/*---Constant---*/
import {SORT_NEW, SORT_ASC, SORT_DESC, SORT_PRICE} from "../../../constants"


/*---Styles---*/
import classes from '../../../styles/pages-components/products/products.module.sass'

/*---Bootstrap---*/
import {Container, Dropdown, Spinner} from "react-bootstrap"

/*---BootstrapIcons---*/
import {Star} from 'react-bootstrap-icons'
import {Compare} from "../../../components/icons/Compare"

/*----Redux----*/
import {connect} from 'react-redux'
import {getCategories} from "../../../redux/actions/actionCategories"
import {setCompare} from "../../../redux/actions/actioncompare";
import {setCart} from "../../../redux/actions/actionCart"
import {Rating} from "../../../components/pages-component/Rating";


/*---Interfaces----*/

interface ICategories {
    id: number,
    recursive_children: ICategories[],
    description: string,
    icon_url: {},
    name: string,
    parent_id: number
}



interface IProducts{
    products: {
        total: number,
        data: IData[]
    },
    cart: {
        items: IData[],
        total_price: number,
        total_quantity: number
    },
    error: {
        state: boolean,
        status: string | null
    }
}

interface IData{
    id: number,
    count: number,
    current_page: number,
    total: number,
    data: IProductsList[]
}

interface IProductsList{
    brand: string,
    category: {slug: string},
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





function ProductList(
    {
        categories,
        serverData,
        compare,
        setCompare,
        setCart

    }:
        {
            categories:ICategories[],
            serverData:IProducts,
            compare: IProductsList[],
            setCompare: (compare:IProductsList[])=>void,
            setCart: (cart:any)=>void
        }){
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [productsList, setProducts] = useState([])
    const {t} = useTranslation()
    const [currentSortValue, setSortValue] = useState('')
    const [totalProducts, setTotalProducts] = useState(0)
    const [compareProducts, setCompareProducts] = useState([])
    const [cartArr, setCartArr] = useState([])
    const [CartObj, setCartObj] = useState(null)
    const [showCartModal, setCartShowCart] = useState(false)

    const {request, error, loading} = AxiosApi()
    const [arrN, setArrN] = useState([])


    const basePath = `/products/${Array.from(router.query.slug).join('/')}`
    const sortArr = [
        {
            url: `${basePath}?category_id=${router.query.category_id?router.query.category_id:''}&sortBy=${SORT_NEW}&order=${SORT_ASC}`,
            title: t('product-list.dropdown-button-sort-new')
        },
        {
            url: `${basePath}?category_id=${router.query.category_id?router.query.category_id:''}&sortBy=${SORT_PRICE}&order=${SORT_ASC}`,
            title: t('product-list.dropdown-button-sort-price-to-high')
        },
        {
            url: `${basePath}?category_id=${router.query.category_id?router.query.category_id:''}&sortBy=${SORT_PRICE}&order=${SORT_DESC}`,
            title: t('product-list.dropdown-button-sort-price-to-low')
        }
    ]


    useEffect(()=>{
        setSortValue(router.query.sortBy && router.query.order?sortSwitch():t('product-list.dropdown-button-sort-new'))
    }, [])

    useEffect(()=>{
         setCompareProducts(compare)
    }, [compare])


    //----Получение данных запрос с сервер сайд----//

    useEffect(()=>{
        if(serverData){

            if(!serverData.error.state){
                setProducts(serverData.products.data)
                setTotalProducts(serverData.products.total)
                getCart()
                // setCartArr(serverData.cart!==null&&serverData.cart?serverData.cart.cart.skus:[])
            }
        }
    }, [serverData])


    //----Сортировка запросов для фильтров----//

    const sortSwitch = ()=>{
        switch(router.query.sortBy){
            case SORT_NEW:
                return t('product-list.dropdown-button-sort-new')
            case SORT_PRICE:
                if(router.query.order===SORT_ASC){
                    return t('product-list.dropdown-button-sort-price-to-high')
                }else{
                    return t('product-list.dropdown-button-sort-price-to-low')
                }
            default:
                return t('product-list.dropdown-button-sort-new')

        }
    }



    useEffect(()=>{
        if(categories && categories!==null){
            nestedCat(categories)

            Array.from(router.query.slug).forEach(item=>{
                filterCat(categories, Number(item))
            })

        }

    }, [categories])

    const getCart = async()=>{
        await request(process.env.GET_CART['ru'])
            .then(result=>{
                setCartArr(result.data.items?result.data.items:[])
            })
    }


    const filterCat = (arr, id)=>{

            if(arr){
                for(let i=0; i<arr.length; i++){
                    if(arr[i].id===id){

                        if(!arrN.filter(item=>item.id===arr[i].id).length){
                            setArrN([...arrN, arr[i]])
                        }

                    }
                    filterCat(arr[i].recursive_children, id)
                }
            }
    }


    const nestedCat = (arr)=>{

           if(arr){
               for(let i=0; i<arr.length; i++){
                   if(arr[i].id===Number(router.query.slug[router.query.slug.length-1])){
                       setTitle(arr[i].name)
                   }
                   nestedCat(arr[i].recursive_children)
               }
           }

    }

    /*-----Preloader Controller----*/

    const responsePreloader = (element, response)=>{
        const buttons = element.querySelectorAll('button')

        if(response){
            buttons.forEach(item=>item.setAttribute('disabled', 'true'))
            element.classList.add(classes['loading-transition'])
        }else{
            buttons.forEach(item=>item.setAttribute('disabled', 'false'))
            element.classList.remove(classes['loading-transition'])
        }
    }

    /*------Обработчик кликов по кнопкам compare, save---*/

    const buttonsClick = (e)=>{

        const data_id = e.currentTarget.getAttribute('data-productid')
        const element = document.querySelector(`[data-productid='${data_id}']`)


        if(element && element!==null){
            responsePreloader(element, true)
        }



        return async(type, warehouse_slug, slug, category_slug)=>{
            if(type==='compare'){
                if(isCompare(warehouse_slug, slug)){
                    deleteCompares(warehouse_slug, slug)
                }else{
                    if(compare[0]&&compare[0].category&&compare[0].category.slug!==category_slug){
                        const quest = confirm('Вы пытаетесь добавить товар из другой категории, начать новый список сравнения?')
                        if(quest){
                           await clearAll()
                        }
                    }

                    await addCompare(element, warehouse_slug, slug)

                }
            }else if(type==='save'){

            }

        }
    }

    /*-----Request Добавить в сравнить----*/

    const addCompare = async(element, warehouse_slug, slug)=>{

            if(compare.length<4){
                await request(`${process.env.COMPARES_ADD['ru']}/${warehouse_slug}/${slug}`, 'PUT')
                    .then(result=>{
                        setCompare(result.data.items)
                        if(element!==null){
                            responsePreloader(element, false)
                        }
                    }).catch(()=>{
                        if(element!==null){
                            responsePreloader(element, false)
                        }
                    })

            }else{
                alert('Нельзя добавлять больше 4')
            }


    }

    /*-----Request Удалить из сравнить----*/

    const deleteCompares = async(warehouse_slug, slug)=>{
        setCompare(compare.filter(item=>item.warehouse.slug!==warehouse_slug && item.slug!==slug))
        await request(`${process.env.COMPARES_REMOVE['ru']}/${warehouse_slug}/${slug}`, 'DELETE')
            .then(result=>{

            }).catch(e=>console.log(''))

    }

    /*-----Request Удалить все из сравнить----*/

    const clearAll = async()=>{
        await request(`${process.env.COMPARES_REMOVE_ALL['ru']}`, 'DELETE')
            .then(result=>{
                setCompare([])
            }).catch(e=>console.log(''))

    }

    /*-----Проверка на продукт в сравнение добавлен----*/

    const isCompare = (warehouse_slug, slug)=>{
        if(compare.length){
            return compare.filter(item=>item.warehouse.slug===warehouse_slug && item.slug===slug).length>0
        }else{
            return false
        }

    }


    /*-----Проверка на продукт в корзину добавлен----*/

    const isAddCart = (slug, warehouse_slug)=>{

        let arr = cartArr.filter(item=>item.slug===slug && item.warehouse.slug===warehouse_slug)
        return arr.length? true : false
    }

    /*//--------CART EVENTS-----------//*/

    /*-----Request добавить в корзину----*/

    const addToCart = async(e,warehouseSlug, slug)=>{

        const button = Array.from(e.currentTarget.getElementsByClassName(classes['spinner-button']))
        button.forEach(item=>{
            let btn = item as HTMLElement
            btn.classList.remove('d-none')
        })

        await request(`${process.env.ADD_TO_CART['ru']}/${warehouseSlug}/${slug}`, 'PUT')
            .then(result=>{

                let data = result.data.items.filter(item=>item.sku.slug===slug).length?result.data.items.filter(item=>item.sku.slug===slug)[0]:{}

                const dataO = {product:data, cart:{
                        totalCount: result.data.total_quantity,
                        totalPrice: result.data.total_price
                    }}

                setCart(result.data)

                setCartObj(dataO)
                button.forEach(item=>{
                    let btn = item as HTMLElement
                    btn.classList.add('d-none')
                })

                setCartArr([...cartArr, data.sku])
                ShowHandle()

            }).catch(e=>{
                console.log(e.response)
            })


    }
    const HideHandle = () => setCartShowCart(false)
    const ShowHandle = () => setCartShowCart(true)



    return(
        <MainComponent>
            <AddToCartModal cartObj={CartObj} onHide={HideHandle} show={showCartModal} catId={Number(router.query.category_id)}/>
            <Container fluid className={classes['container-products']}>

                <BreadCrumbs arr={arrN}/>

                <h1 className={`font-weight-bold`}>{title}</h1>

                <div className={`d-flex ${classes['wrap-product-list']}`}>
                    <div className={`col-3 ${classes['filters-products']}`}>
                        <div className={`${classes['sticky-container']}`}>

                        </div>
                    </div>
                    <div className={`col-9 ${classes['products-list-container']}`}>
                        <div className={`${classes['top-content-products']} d-flex justify-content-between`}>
                            <p className={`font-weight-bold mb-0 align-self-center`}>{totalProducts} items</p>
                            <Dropdown className={`${classes['dropdown-filters']} d-flex`}>
                                <p className={`mb-0 align-self-center pr-3`}>
                                    {t('product-list.dropdown-title')}
                                </p>
                                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                                    {currentSortValue}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        sortArr.map((item, index)=>{
                                            return(
                                                <p key={index}>
                                                    <Link href={item.url}>
                                                        <a>{item.title}</a>
                                                    </Link>
                                                </p>
                                            )
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className={'mt-3'}>
                            {
                                productsList.map((item, index)=>{

                                    return(
                                        <div className={`d-flex ${classes['item-product']} p-3 position-relative`} key={index} data-productid={index}>
                                            <div className={`position-absolute ${classes['preloader-spinner']}`}><Preloader /></div>
                                            <div className={`${classes['picture-product']} col-lg-3`}>
                                                <Link href={`/product/${item.warehouse.slug}/${item.slug}`}>
                                                    <a>
                                                        <LazyLoadImage image={{
                                                            src: item.images[0].original_image,
                                                            srcSet: item.images[0].image_srcset,
                                                            alt: item.name
                                                        }}/>
                                                    </a>
                                                </Link>
                                            </div>

                                            <div className={`${classes['info-product']} col-lg-6 d-flex flex-column justify-content-center`}>
                                                <p>
                                                    <Link href={`/product/${item.warehouse.slug}/${item.slug}`}>
                                                        <a>{item.name}</a>
                                                    </Link>
                                                </p>
                                                <Rating />
                                                <div className={`${classes['buttons-product']} d-flex`}>
                                                    <div
                                                        className={`d-flex ${classes['button-compare']} ${isCompare(item.warehouse.slug, item.slug)?classes['active']:''}`}
                                                         onClick={(e)=>{
                                                             let clickFunc = buttonsClick(e)
                                                             clickFunc('compare',
                                                                 item.warehouse.slug, item.slug, item.category.slug)
                                                         }} data-productid={index}>
                                                        <Compare />
                                                        <p className='mb-0'>Compare</p>
                                                    </div>

                                                    <div className={`d-flex ${classes['button-save']}`}
                                                         onClick={(e)=>{
                                                             let clickFunc = buttonsClick(e)
                                                             clickFunc('save', item.warehouse.slug, item.slug, item.category.slug)
                                                         }} data-productid={index}>
                                                        <svg height="404pt" viewBox="-58 0 404 404.54235" width="404pt" xmlns="http://www.w3.org/2000/svg" className='d-lg-block d-none'>
                                                            <path d="m277.527344 0h-267.257813c-5.519531 0-10 4.476562-10 10v374.527344c-.007812 7.503906 4.183594 14.378906
                                                        10.855469 17.808594 6.675781 3.425781 14.707031 2.828124 20.796875-1.550782l111.976563-80.269531 111.980468
                                                        80.265625c6.09375 4.371094 14.117188 4.964844 20.789063 1.539062 6.667969-3.425781 10.863281-10.296874
                                                        10.863281-17.792968v-374.527344c0-5.523438-4.480469-10-10.003906-10zm-10 384.523438-117.796875-84.441407c-3.484375-2.496093-8.171875-2.496093-11.652344
                                                        0l-117.800781 84.445313v-364.527344h247.25zm0 0"/>
                                                        </svg>
                                                        <p className='mb-0'>Save</p>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className={`${classes['product-price-cart']} col-lg-3 d-flex flex-column justify-content-center`}>
                                                <p>{CostReplace(item.price.price)} UZS</p>
                                                {
                                                    isAddCart(item.slug, item.warehouse.slug)?
                                                        (<Link href={'/cart'}>
                                                            <a className={`${classes['added-cart']} d-flex justify-content-center`}>
                                                                <svg version="1.1" id="Layer_1" x="0px" y="0px"
                                                                     width="512px" height="512px" viewBox="0 0 512 512" enableBackground="new 0 0 512 512">
                                                                    <g>
                                                                        <path d="M160,400c-13.248,0-24,10.752-24,24s10.752,24,24,24s24-10.752,24-24S173.248,400,160,400z"/>
                                                                        <path d="M384.5,400c-13.248,0-24,10.752-24,24s10.752,24,24,24s24-10.752,24-24S397.748,400,384.5,400z"/>
                                                                        <path d="M448,128L123.177,95.646c-1.628-6.972-4.369-14.66-11.838-20.667C102.025,67.489,86.982,64,64,64v16.001
                                                                        c18.614,0,31.167,2.506,37.312,7.447c4.458,3.585,5.644,8.423,7.165,15.989l-0.024,0.004l42.052,233.638
                                                                        c2.413,14.422,7.194,25.209,13.291,32.986C171.043,379.312,180.533,384,192,384h240v-16H192c-4.727,0-19.136,0.123-25.749-33.755
                                                                        l-5.429-30.16L432,256L448,128z"/>
                                                                    </g>
                                                                </svg>
                                                                <span>{t('button-added-cart')}</span>
                                                            </a>
                                                    </Link>):(
                                                            <button
                                                                className={`d-flex justify-content-center`}
                                                                disabled={loading}
                                                                onClick={(e)=>{
                                                                    addToCart(e,item.warehouse.slug, item.slug)

                                                                }}
                                                            >

                                                                <svg version="1.1" id="Layer_1" x="0px" y="0px"
                                                                     width="512px" height="512px" viewBox="0 0 512 512" enableBackground="new 0 0 512 512">
                                                                    <g>
                                                                        <path d="M160,400c-13.248,0-24,10.752-24,24s10.752,24,24,24s24-10.752,24-24S173.248,400,160,400z"/>
                                                                        <path d="M384.5,400c-13.248,0-24,10.752-24,24s10.752,24,24,24s24-10.752,24-24S397.748,400,384.5,400z"/>
                                                                        <path d="M448,128L123.177,95.646c-1.628-6.972-4.369-14.66-11.838-20.667C102.025,67.489,86.982,64,64,64v16.001
                                                                c18.614,0,31.167,2.506,37.312,7.447c4.458,3.585,5.644,8.423,7.165,15.989l-0.024,0.004l42.052,233.638
                                                                c2.413,14.422,7.194,25.209,13.291,32.986C171.043,379.312,180.533,384,192,384h240v-16H192c-4.727,0-19.136,0.123-25.749-33.755
                                                                l-5.429-30.16L432,256L448,128z"/>
                                                                    </g>
                                                                </svg>

                                                                <p className='mb-0'>{t('cart-button')}</p>
                                                                <Spinner animation="border" role="status" className={`d-none ${classes['spinner-button']}`}>
                                                                    <span className="sr-only">Loading...</span>
                                                                </Spinner>
                                                            </button>
                                                        )
                                                }

                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <Pagination total={serverData.products && serverData.products.total?serverData.products.total:0}/>
            </Container>
        </MainComponent>
    )
}

function Pagination ({total}:{total:number}){

    let a = []
    for(let i=0; i<Math.ceil(total/12); i++){
        a.push(i+1)
    }
    const router = useRouter()
    const {page, category_id} = router.query
    const arrSlug = Array.from(router.query.slug)

    return(
        <div className={`d-flex ${classes['pagination']} justify-content-center mt-5 mb-5`}>
            {
                a.map(item=>{
                    return(
                        <p key={item} className={`${page===String(item) || !page?classes['active']:''} mb-0`}>
                            <Link href={`/products/${arrSlug.join('/')}?category_id=${category_id}&page=${item}`}>
                                <a>{item}</a>
                            </Link>
                        </p>
                    )
                })
            }
            <p className={`${Number(page)===(a.length) || !page?'d-none':''} mb-0`}>
                <Link href={`/products/${arrSlug.join('/')}?category_id=${category_id}&page=${Number(page)+1}`}>
                    <a>{'>'}</a>
                </Link>
            </p>
        </div>
    )
}


export async function getServerSideProps(context) {

    const lang = 'ru'
    const {category_id, sortBy, order} = context.query
    const page = context.query.page ? context.query.page : 1


    const res = await fetch(`${process.env.API_PRODUCTS_LIST[lang]}?category_id=${category_id}&perPage=12&sortBy=${sortBy?sortBy:'new'}&order=${order?order:'asc'}&page=${page}`, {
        credentials: 'include'
    })



    let data = null

    if(res.status===200 || res.status===201){
        data = await res.json()
    }else{
        return{
            props: {
                serverData:{
                    products: null,
                    error: {
                        state: true,
                        status: res.status
                    }
                }
            }

        }
    }

    return {
        props: {serverData:{
                products:data, error: {state:false, status: null}
            }
        }
    }


}




const mapStateToProps = state=>({
    categories: state.categories,
    compare: state.compare
})

const mapDispatchToPRops = {
    getCategories,
    setCompare,
    setCart

}

export default connect (mapStateToProps, mapDispatchToPRops)(ProductList)