import {useEffect, useState} from 'react'
import {useRouter} from "next/router"

/*---Components---*/
import {Header} from './main-components/Header'
import {Footer} from './main-components/Footer'
import {CompareBlock} from "./main-components/compare-block"

/*---Virt Db----*/
import {categoriesBot} from '../virtDb/categoriesM'

/*----Redux----*/
import {connect} from 'react-redux'
import {getCategories, setCategories} from '../redux/actions/actionCategories'
import {setCompare} from '../redux/actions/actioncompare'
import {setCart} from '../redux/actions/actionCart'
import {getBrands, setBrands} from '../redux/actions/actionBrands'
import {setRecently} from "../redux/actions/actionRecently"
import {setPopularProducts} from "../redux/actions/actionPopularProducts"

/*----Hooks----*/
import {AxiosApi} from "../hooks/axios.hook"


interface IProducts{
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
    items: [],
    total_price: number,
    total_quantity: number
}



function MainComponent (
    {
        children,
        categories,
        compare,
        getBrands,
        setCompare,
        cart,
        brands,
        setCart,
        setCategories,
        setBrands,
        recently,
        setRecently,
        setPopularProducts,
        popular


    }:
        {
            children: React.ReactElement,
            categories: [],
            compare: [],
            setCompare: (compare:IProducts[])=>void,
            cart: ICart,
            setCart: (value: ICart)=>void,
            getBrands: ()=>void,
            brands: [],
            setCategories: (value: [])=>void,
            setBrands: (value: [])=>void,
            recently: IProducts[],
            setRecently: (value: IProducts[])=>void,
            setPopularProducts: (value: IProducts[])=>void,
            popular: IProducts[]
        }
        ){


    const [dropDownState, setDropDown] = useState(false)
    const {request} = AxiosApi()
    const [categoriesMount, setCategoriesMount] = useState(true)
    const [brandsMount, setBrandsMount] = useState(true)
    const [compareMount, setCompareMount] = useState(true)
    const [recentlyMount, setRecentlyMount] = useState(true)


    const router = useRouter()



    useEffect(()=>{

        if(!brands.length && brandsMount){
            getBrandsF()
        }


        if(!categories.length && categoriesMount){
            getCategoriesF()
        }


    }, [])

    useEffect(()=>{
        if(!cart || cart==null || JSON.stringify(cart)==='[]'){
            getCartF()
        }
    }, [cart])

    useEffect(()=>{
        if(!compare.length && compareMount){
            getCompareF()
        }

    }, [compare, compareMount])

    useEffect(()=>{
        if(recentlyMount){
            getRecently()
        }
    }, [recently])

    useEffect(()=>{
        if(!popular.length){
            getPopularProducts()
        }
    }, [popular])

    const getCompareF = async()=>{
        await request(process.env.COMPARES_GET_LIST['ru'])
            .then(result=>{
                setCompare(result.data.items)
                setCompareMount(false)
            })
    }

    const getCartF = async()=>{
        await request(process.env.GET_CART['ru'])
            .then(result=>{
                setCart(result.data)
            }).catch(err=>console.log(err.message))
    }

    const getCategoriesF = async()=>{
        await request(process.env.API_CATEGORIES['ru'])
            .then(result=>{
                setCategoriesMount(false)
                //setCategoriesArr(result.data)
                setCategories(result.data)

            })
    }

    const getBrandsF = async()=>{
        await request(process.env.API_BRANDS['ru'])
            .then(result=>{
                setBrandsMount(false)
                setBrands(result.data)
            })
    }

    const getRecently = async()=>{
        await request(process.env.GET_RECENTLY_LIST['ru'])
            .then(result=>{
                setRecently(result.data)
                setRecentlyMount(false)
            })
    }

    const getPopularProducts = async()=>{
        await request(process.env.GET_POPULAR_PRODUCTS['ru'])
            .then(result=>{
                setPopularProducts(result.data)
            })
    }



    // useEffect(()=>{
    //     setCategories(categories)
    // }, [categories])


    return(
        <>
            <Header
                menu={categories}
                cart={cart&&cart.total_quantity?cart.total_quantity:0}
                brands={brands}
                setDropDown={setDropDown}
                dropDownState={dropDownState}
                recently={recently}
                popular = {popular}
            />
            <div className={`${dropDownState?'d-block':'d-none'} position-absolute w-100 h-100`}
                 style={{
                     backgroundColor: 'rgba(0,0,0,.8)',
                     left: '0',
                     top: '0',
                     zIndex: 9
                 }}/>
                <div className='position-relative'>
                    {children}

                    <CompareBlock compare={compare} setCompare={setCompare}/>
                </div>
            <Footer categoriesTop={categories} categoriesBot={categoriesBot}/>
        </>
    )
}

const mapStateToProps = state=>({
    categories: state.categories,
    compare: state.compare,
    cart: state.cart,
    brands: state.brands,
    recently: state.recently,
    popular: state.popular
})

const mapDispatchToPRops = {
    getCategories,
    setCompare,
    setCart,
    getBrands,
    setCategories,
    setBrands,
    setRecently,
    setPopularProducts


}

export default connect (mapStateToProps, mapDispatchToPRops)(MainComponent)
