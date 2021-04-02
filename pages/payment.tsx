import {useEffect, useState} from 'react'
import {useTranslation} from "react-i18next"
import {useRouter} from "next/router"


/*----Components----*/
import MainComponent from "../components/Main-Component"
import {Tracker} from "../components/pages-component/checkout/tracker"
import {PaymentOrderForm} from "../components/pages-component/payment/order-form"


/*---Bootstrap---*/
import {Container, Accordion, Card, Button} from "react-bootstrap"
import classes from "../styles/pages-components/checkout/main-style.module.sass";


/*---Icons----*/
import {GiftCard} from "../components/icons/GiftCard"

/*----Redux----*/
import {connect} from 'react-redux'
import {setCart} from "../redux/actions/actionCart"


/*---Hooks----*/
import {AxiosApi} from "../hooks/axios.hook"



function Payment({cartObj, setCart}){

    const {t} = useTranslation()
    const [giftCard, setGiftCard] = useState({
        card_number: '',
        pin: ''
    })
    const [formData, setFormData]  = useState(null)
    const [cartTotal, setCartTotal] = useState(0)
    const [paymentType, setPaymentType] = useState({
        cart: false,
        cash: true
    })
    const router = useRouter()
    const {request} = AxiosApi()

    useEffect(()=>{
        if(!cartObj || JSON.stringify(cartObj)==='[]'){
            getCartF()
        }else{
            setCartTotal(cartObj && cartObj.total_price?cartObj.total_price:0)
        }
    }, [cartObj])

    useEffect(()=>{
        if(window!==undefined){
            const orderData = localStorage.getItem('user-form')
            if(orderData && orderData!==null){
                setFormData(JSON.parse(orderData))
            }else{
                router.push('/checkout')
            }

        }
    }, [])

    async function getCartF (){
        await request(process.env.GET_CART['ru'])
            .then(result=>{
                setCart(result.data)
            })
    }


    return(
        <MainComponent>
            <Container fluid>
                <Tracker />
                <div className={`d-flex ${classes['main-wrap']}`}>
                    <div className={`col-lg-9 pt-3`}>
                        <h4 className="font-weight-bold">{t('payment.title-gifCard')}</h4>

                        <Accordion>
                            <Card>
                                <Card.Header>
                                    <div className={classes['button-accordion']}>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            <GiftCard />
                                            <span className='font-weight-bold'>{t('payment.title-gifCard-button')}</span>
                                        </Accordion.Toggle>
                                    </div>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <div className={`d-flex ${classes['gift-form']}`}>
                                            <div className='col-lg-6 d-flex justify-content-end flex-column'>
                                                <p className='mb-0'><label htmlFor="card-number">{t('payment.label1-gifCard')}</label></p>
                                                <p className='mb-0'><input type="text" value={giftCard.card_number} id={'card-number'} className='w-100 mb-0'/></p>
                                            </div>
                                            <div className='col-lg-3 d-flex justify-content-end flex-column'>
                                                <p className='mb-0'><label htmlFor="card-pin">{t('payment.label2-gifCard')}</label></p>
                                                <p className='mb-0'><input type="text" value={giftCard.pin} id={'card-pin'} className='w-100 mb-0'/></p>
                                            </div>
                                            <div className='col-lg-3 d-flex justify-content-end flex-column'>
                                                <button>{t('payment.button-gifCard')}</button>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>

                        <div className={`${classes['block-payments-type']} mt-3`}>
                            <div>
                                <p>{t('payment.title-type-payment')}</p>
                                <div className={`${classes['check-bocks']} ${paymentType.cash?classes['active']:''}`} onClick={()=>{
                                    setPaymentType({cart:false, cash:true})
                                    setFormData({...formData, payment_type: 'cash'})
                                    localStorage.setItem('user-form', JSON.stringify(formData))
                                }}/>
                            </div>
                            <div>
                                <p>{t('payment.title-type-payment2')}</p>
                                <div className={`${classes['check-bocks']} ${paymentType.cart?classes['active']:''}`} onClick={()=>{
                                    setPaymentType({cart:true, cash:false})
                                    setFormData({...formData, payment_type: 'terminal'})
                                    localStorage.setItem('user-form', JSON.stringify(formData))
                                }}/>
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-3 pt-5'>
                        <PaymentOrderForm cartTotal={cartTotal}/>
                    </div>
                </div>
            </Container>
        </MainComponent>
    )
}


const mapStateToProps = state=>({
    cartObj: state.cart
})

const mapDispatchToPRops = {
    setCart
}

export default connect (mapStateToProps, mapDispatchToPRops)(Payment)
