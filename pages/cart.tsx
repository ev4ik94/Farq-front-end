import {useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'

/*---Components----*/
import MainComponent from "../components/Main-Component"
import {CartProduct} from '../components/pages-component/cart/Cart-product'
import {FormApplication} from '../components/pages-component/cart/form-application'
import {Preloader} from "../components/preloader/Preloader"

/*---Styles----*/
import classes from '../styles/pages-components/cart/main-component.module.sass'

/*----Bootstrap components---*/
import {Container} from 'react-bootstrap'

/*---Hooks----*/
import {AxiosApi} from "../hooks/axios.hook"

/*----Redux----*/
import {connect} from 'react-redux'
import {setCart} from "../redux/actions/actionCart"


/*----Interface-----*/

interface ICart{
    items: IItems[],
    total_price: number,
    total_quantity: number
}

interface IItems{
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

interface Error{
    state: boolean,
    status: number
}



function Cart({
                  cart,
                  error,
                  setCart,
                  cartObj}:
                  {
                      cart: ICart,
                      cartObj:ICart,
                      error: Error,
                      setCart: (cart:ICart)=>void}){

    const [cartArr, setCartArr] = useState([])
    const [currentUpdate, setCurrentUpdate] = useState({
        id: 0,
        quantity: 0,
        isChanged: false
    })
    const [totalCost, setTotal] = useState(0)
    const {request, loading} = AxiosApi()
    const {t} = useTranslation()


    useEffect(()=>{
        if(!error.state){
            if(!cartObj || cartObj===null || (cartObj.items && !cartObj.items.length)){
                if(cart!==null){

                    setCart(cart)
                    totalPrice(cart.items)
                    setCartArr(cart.items)
                }
            }else{
                setTotal(cartObj.total_price)
                setCartArr(cartObj.items)

            }
        }
    }, [cart, error])

    const totalPrice = (arr)=>{
        let total_price = 0
        arr.forEach(item=>{
            total_price+= (item.sku.price.price * item.quantity)
        })
        setTotal(total_price)
    }


    const quantityAdd = (id, quantity)=>{
        setCartArr(cartArr.map(item=>{
            if(item.cart_id===id){
               if(item.quantity<=30){
                   item.quantity++
                   setCurrentUpdate({
                       id, quantity: ++quantity, isChanged: true
                   })
                   totalPrice(cartArr)
               }
            }
            return item
        }))



    }
    const quantitySub = (id, quantity)=>{

        setCartArr(cartArr.map(item=>{
            if(item.cart_id===id){
                if(item.quantity>1){
                    item.quantity--
                    totalPrice(cartArr)
                    setCurrentUpdate({
                        id, quantity: --quantity, isChanged: true
                    })
                }
            }
            return item
        }))


    }
    const deleteProduct = async(cart_id)=>{
        await request(`${process.env.REMOVE_TO_CART['ru']}/${cart_id}`, 'DELETE')
            .then((result)=>{
                setCartArr(cartArr.filter(item=>item.cart_id!==cart_id))
                setTotal(result.data.total_price)
                setCart(result.data)
                totalPrice(result.data)
            })
            .catch(e=>console.log(e))
    }



    const updateCartProduct = async()=>{

      if(currentUpdate.isChanged){
          setCurrentUpdate({...currentUpdate, isChanged: false})
          await request(`${process.env.EDIT_TO_CART['ru']}/${currentUpdate.id}/${currentUpdate.quantity}`, 'PATCH')
              .then((result)=>{
                  totalPrice(result.data.items)
                  setCart(result.data)
              })
              .catch(e=>console.log(e))
      }
    }




    if(!error.state && cart!==null){
        return(
            <MainComponent>


                    <Container fluid className={`${classes['container']} pl-0 pt-3`}>
                        {
                            cartArr.length?(<>
                                <h1 className={`ml-5`}>{t('cart-page.title')}</h1>
                                <div className={`d-flex ${classes['main-wrap']}`}>
                                    <div className={`col-lg-9`}>
                                        <CartProduct cart={cartArr} quantityAdd={quantityAdd} quantitySub={quantitySub} deleteProduct={deleteProduct} updateCartProduct={updateCartProduct}/>
                                    </div>
                                    <div className={`col-lg-3`}>
                                        <FormApplication cartTotal={totalCost} loading={loading}/>
                                    </div>
                                </div></>):(<><h1 className='text-center'>{t('cart-page.cart-empty')}</h1></>)
                        }
                    </Container>

            </MainComponent>
        )
    }

    return(
        <MainComponent>
            <Container>
                {error.status}
            </Container>
        </MainComponent>
    )

}

export async function getServerSideProps (ctx){

    let status = 0
    const response = await fetch(`${process.env.GET_CART['ru']}`)
    let dataCart = null

    if(!response.ok){
        status = response.status
    }else{
        dataCart = await response.json()
    }

    return{
        props: {
            cart: dataCart,
            error: {
                state: status!==0?true:false,
                status: status
            }
        }
    }
}


const mapStateToProps = state=>({
    cartObj: state.cart
})

const mapDispatchToPRops = {
    setCart
}

export default connect (mapStateToProps, mapDispatchToPRops)(Cart)