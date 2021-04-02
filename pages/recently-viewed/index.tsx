import {useTranslation} from "react-i18next"
import {useState, useEffect} from 'react'

/*---Components----*/
import MainComponent from "../../components/Main-Component"
import {ProductsList} from "../../components/pages-component/recently-page/products-list-recently"
import {AddToCartModal} from "../../components/alerts/add-to-cart"


/*----Bootstrap-----*/
import {Container} from "react-bootstrap"

/*------Icons-------*/
import {Save} from '../../components/icons/Save'
import {TimeClock} from "../../components/icons/time-oclock"

/*---Styles---*/
import classes from '../../styles/pages-components/recently-viewed/recently-list.module.sass'

/*----Redux-----*/
import {connect} from 'react-redux'
import {setRecently} from "../../redux/actions/actionRecently"
import {setSaved} from "../../redux/actions/actionSaved"
import {setCart} from "../../redux/actions/actionCart"
import {setCompare} from "../../redux/actions/actioncompare"


/*---Hooks---*/
import {AxiosApi} from "../../hooks/axios.hook"


/*---Interface---*/
interface ICart{
    items: [],
    total_price: number,
    quantity: number
}


function RecentlyViewed({
                            recently,
                            saved,
                            setRecently,
                            setSaved,
                            cart,
                            setCart,
                            setCompare,
                            compare
                        }:
                            {
                                recently: [],
                                saved: [],
                                cart: ICart,
                                setRecently: (value: [], lang?: string)=>void,
                                setSaved: (value: [], lang?: string)=>void,
                                setCart: (value: [])=>void,
                                setCompare: (value: [])=>void,
                                compare: {items: []}
                            }){

    const {t} = useTranslation()
    const [recentlyToggle, setRecentlyToggle] = useState(true)
    const [ProductCart, setProductCart] = useState(null)

    const {request} = AxiosApi()

    /*-------Use Effect START-----*/

    useEffect(()=>{
        if(!recently.length){
            GetRecently()
        }
    }, [recently])

    useEffect(()=>{
        if(!saved.length){
            GetSaved()
        }
    }, [saved])

    /*-------Use Effect END-----*/

    /*------Request functions START-------*/

    /*-------Request Get Recently Products ------*/

    async function GetRecently(){
        await request(process.env.GET_RECENTLY_LIST['ru'])
            .then(result=>{
                setRecently(result.data, 'ru')
            }).catch(e=>console.log(e.message))
    }

    /*-------Request Get Saved Products ------*/

    async function GetSaved(){
        await request(process.env.GET_SAVED['ru'])
            .then(result=>{
                setSaved(result.data, 'ru')
            }).catch(e=>console.log(e.message))
    }

    /*-------Controller DELETE Recently-Saved Products ------*/

    async function deleteProduct(type='', item, warehouse_slug, slug){
        if(type==='save_delete'){
            deleteSave(item, warehouse_slug, slug)
        }else{
            if(recentlyToggle){
                console.log('Delete Recently', slug)
            }else{
                deleteSave(item, warehouse_slug, slug)
            }
        }
    }

    /*------Request Add to Cart -----*/

    const addToCart = async(item, warehouse_slug, slug)=>{
        preloaderShow(item, 'show')
        await request(`${process.env.ADD_TO_CART['ru']}/${warehouse_slug}/${slug}`, 'PUT')
            .then(result=>{

                preloaderShow(item, 'hide')
                setCart(result.data)
                const productCart = result.data.items.filter(item=>item.sku.warehouse.slug===warehouse_slug && item.sku.slug===slug)[0]
                setProductCart({
                    product: productCart?productCart:null,
                    cart: {
                        totalPrice: result.data.total_price,
                        totalCount: result.data.quantity
                    }
                })

            }).catch(e=>e.message)
    }

    /*------Request Add to Compare -----*/

    const addToCompare = async(item, warehouse_slug, slug)=>{
        preloaderShow(item, 'show')
        await request(`${process.env.COMPARES_ADD['ru']}/${warehouse_slug}/${slug}`, 'PUT')
            .then(result=>{
                preloaderShow(item, 'hide')
                setCompare(result.data)
            }).catch(e=>e.message)
    }

    /*------Request Delete Compare -----*/

    const deleteCompare = async(item, warehouse_slug, slug)=>{
        preloaderShow(item, 'show')
        await request(`${process.env.COMPARES_REMOVE['ru']}/${warehouse_slug}/${slug}`, 'DELETE')
            .then(result=>{
                preloaderShow(item, 'hide')
                setCompare(result.data)
            }).catch(e=>e.message)
    }

    /*------Request Add to Save -----*/

    const addToSave = async(item, warehouse_slug, slug)=>{
        console.log('add save')
    }

    /*------Request Delete Save -----*/

    const deleteSave = async(item, warehouse_slug, slug)=>{
        console.log('delete save')
    }

    /*------Request Delete All Recently----*/
    const deleteRecentlyAll = async()=>{
        setRecently([])
    }

    /*------Request Delete All Saved----*/
    const deleteSavedAll = async()=>{
        setSaved([])
    }


    /*------Request Functions END-----*/


    const preloaderShow = (item, event)=>{
        const element = document.querySelector(`[data-item='${item}']`)

        if(event==='show'){
            element.classList.add('d-block')
        }else{
            element.classList.remove('d-block')
            element.classList.add('d-none')
        }
    }



    return(
        <MainComponent>
            <Container fluid className='mb-5'>
                <AddToCartModal
                    cartObj={ProductCart}
                    show={ProductCart!==null}
                    onHide={()=>setProductCart(null)}
                />

               <div className={`${classes['nav-toggles-button']}`}>
                    <div className='d-flex mt-3'>

                        <button
                            className={`${recentlyToggle?classes['active']:''} d-flex align-items-center mr-3`}
                            onClick={()=>{
                                setRecentlyToggle(true)
                            }}
                        >
                            <div className='mr-1'><TimeClock /></div>
                            <p className='mb-0'>{t('recently.button-toggle-recently')}</p>
                        </button>

                        <button
                            className={`${!recentlyToggle?classes['active']:''} d-flex align-items-center`}
                            onClick={()=>{
                                setRecentlyToggle(false)
                            }}
                        >
                           <div className='mr-1'> <Save /></div>
                            <p className='mb-0'>{t('recently-page.save-toggle')}</p>
                        </button>
                    </div>
               </div>
                <button className={classes['button-clear-all']} onClick={()=>{
                    if(recentlyToggle){
                        deleteRecentlyAll()
                    }else{
                        deleteSavedAll()
                    }
                }}>{t('recently-page.clear-all')}</button>
                <div className={`${classes['list-products-recently-saved']} d-flex flex-wrap justify-content-start`}>
                    <ProductsList
                        products={recentlyToggle?recently:saved}
                        save={saved}
                        deleteProduct={deleteProduct}
                        recentlyToggle={recentlyToggle}
                        cart={cart.items?cart.items:[]}
                        setCart={setCart}
                        addToCart={addToCart}
                        addToCompare={addToCompare}
                        deleteCompare={deleteCompare}
                        addToSave={addToSave}
                        compare={compare.items?compare.items:[]}
                    />
                </div>
            </Container>
        </MainComponent>
    )
}

const mapStateToProps = state=>({
    recently: state.recently,
    saved: state.saved,
    cart: state.cart,
    compare: state.compare
})


const mapDispatchToPRops = {
    setRecently,
    setSaved,
    setCart,
    setCompare

}

export default connect(mapStateToProps, mapDispatchToPRops)(RecentlyViewed)
