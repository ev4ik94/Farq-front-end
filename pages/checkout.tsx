import {useTranslation} from "react-i18next"
import {useEffect, useState} from 'react'
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";

/*---Components----*/
import MainComponent from "../components/Main-Component"
import {Tracker} from '../components/pages-component/checkout/tracker'
import {OrderForm} from '../components/pages-component/checkout/order-form'
import {MaskInput} from "../components/pages-component/checkout/masked-input";


/*---Styles---*/
import classes from '../styles/pages-components/checkout/main-style.module.sass'


/*----Bootstrap---*/
import {Container} from 'react-bootstrap'


/*----Redux----*/
import {connect} from 'react-redux'
import {setCart} from '../redux/actions/actionCart'

/*----Hooks---*/
import {AxiosApi} from "../hooks/axios.hook"

/*---interface----*/

interface ICart{
    items: [],
    total_price: number,
    total_quantity: number
}


function Checkout({cartObj, setCart}:{cartObj:ICart, setCart:(cart:ICart)=>void}){

    const {t} = useTranslation()
    const {request, loading} = AxiosApi()

    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        phone: '',
        email: '',
        comment: '',
        address: '',
        city: '',
        country: '',
        delivery_type: 'delivery',
        payment_type: 'terminal',
        is_lifting: true,
        date_delivery: ''
    })

    const [totalPrice, setTotalPrice] = useState(0)

    const ph = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/



    const ClientSchema = Yup.object().shape({
        name: Yup.string()
            .min(4, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        lastName: Yup.string()
            .min(4, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        phone: Yup.string()
            .matches(ph, 'Phone error').required(),
        email: Yup.string().email('Invalid email'),
        city: Yup.string(),
        country: Yup.string()

    })

    useEffect(()=>{

        if(!cartObj || JSON.stringify(cartObj)==='[]'){
            getCart()
        }else{
            totalPriceF(cartObj.items)
        }
    }, [cartObj])

    const getCart = async()=>{

        await request(process.env.GET_CART['ru'])
            .then(result=>{
                setCart(result.data)
                totalPriceF(result.data.items)
            })
    }

    const totalPriceF = (arr)=>{
        let total_p = 0
        arr.forEach(item=>{
            total_p+= (item.sku.price.price*item.quantity)
        })
        setTotalPrice(total_p)
    }



    const dataSubmit = (values)=>{

        const data = {
            name: values.name,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
            address: values.address,
            delivery_type: formData.delivery_type,
            payment_type: formData.payment_type,
            is_lifting: formData.is_lifting,
            date_delivery: formData.date_delivery
        }

        return data
    }




    return(
        <MainComponent>
            <Container fluid>
                <Tracker />
                <div className={`d-flex ${classes['main-wrap']}`}>

                    <Formik
                        initialValues={{
                            name: formData.name,
                            lastName: formData.lastName,
                            email: '',
                            phone: formData.phone,
                            city: '',
                            country: '',
                            delivery_type: formData.delivery_type,
                            payment_type: formData.payment_type,
                            is_lifting: formData.is_lifting,
                            date_delivery: formData.date_delivery


                        }}
                        validationSchema={ClientSchema}
                        onSubmit={async (values) => {

                        }}


                    >
                        {({
                              errors,
                              values,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting,
                              touched
                          })=>(

                            <Form className={`w-100 pt-3 ${classes['form-wrap-shipping']} d-flex`} onSubmit={handleSubmit}>

                                <div className={`col-lg-9 pt-3`}>
                                    <h3>{t('checkout-page.item-1')}</h3>
                                    <div className={`${classes['contact-info']} ${classes['group-form']}`}>
                                        <p>{t('checkout-page.form-contact-title')}</p>
                                        <p>{t('checkout-page.form-contact-label')}</p>
                                        <Field name='email'
                                               className={`${errors.email && touched.email ? classes['error-field']:''} col-lg-6`}
                                               value={values.email}
                                               onBlur={handleBlur}
                                               onChange={handleChange}

                                        />
                                    </div>

                                    <div className={`${classes['group-form']} mt-3`}>
                                        <p>{t('checkout-page.item-1')}</p>
                                        <div className={`d-flex justify-content-between flex-wrap`}>
                                            <div className={`col-lg-6 pl-0`}>
                                                <p className={`mb-0`}>{t('checkout-page.form-shipping-label1')}</p>
                                                <Field name='name'
                                                       className={`${errors.name && touched.name ? classes['error-field']:''}`}
                                                       value={values.name}
                                                       onBlur={handleBlur}
                                                       onChange={handleChange}

                                                />
                                            </div>
                                            <div className={`col-lg-6 pl-0`}>
                                                <p className={`mb-0`}>{t('checkout-page.form-shipping-label2')}</p>
                                                <Field name='lastName'
                                                       className={`${errors.lastName && touched.lastName ? classes['error-field']:''}`}
                                                       value={values.lastName}
                                                       onBlur={handleBlur}
                                                       onChange={handleChange}

                                                />
                                            </div>

                                            <div className={`d-flex col-lg-12 pl-0 pr-0`}>
                                                <div className='pt-1 pb-1 pl-0 col-lg-6'>
                                                    <p className={`mb-0`}>{t('checkout-page.form-shipping-label3')}</p>
                                                    <Field name='city'
                                                           as='select'
                                                           className={`${errors.city && touched.city ? classes['error-field']:''} w-100`}
                                                           value={values.city}
                                                           onBlur={handleBlur}
                                                           onChange={handleChange}
                                                    >
                                                        <option value="Tashkent" selected>Tashkent</option>
                                                        <option value="Tashkent" selected>Tashkent</option>
                                                        <option value="Tashkent" selected>Tashkent</option>
                                                    </Field>
                                                </div>
                                                <div className='pt-1 pb-1 col-lg-6'>
                                                    <p className='mb-0'><label className='mb-0'>{t('account.address-input-label2')}</label></p>
                                                    <Field name='country'
                                                           as='select'
                                                           disabled
                                                           className={`${errors.country && touched.country ? classes['error-field']:''} w-100`}
                                                           value={values.country}
                                                           onBlur={handleBlur}
                                                           onChange={handleChange}
                                                    >
                                                        <option value="Uzbekistan" selected>Uzbekistan</option>
                                                    </Field>
                                                </div>

                                            </div>

                                            <div className={`col-lg-6 pl-0`}>
                                                <p className={`mb-0`}>{t('checkout-page.form-shipping-label9')}</p>
                                                <Field value={values.phone}
                                                       name='phone'
                                                       className={`${errors['phone'] && touched['phone'] ? classes['error-field'] : '' }`}
                                                       onChange={handleChange}
                                                       onBlur={handleBlur}
                                                       component = {MaskInput}
                                                />
                                            </div>
                                        </div>
                                        <div className={`${classes['wrap-calendar']} mt-5 col-6 pl-0`}>
                                            <h2>{t('checkout.calendar-title')}</h2>
                                            <div className={`${classes['date-picker']}`}>
                                                <input type="datetime-local" className="mt-3"
                                                       onChange={(e)=>setFormData({...formData, date_delivery: e.target.value})}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-lg-3 pt-5`}>
                                    <OrderForm
                                        cartTotal={totalPrice}
                                        handleSubmit={handleSubmit}
                                        values={values}
                                        dataSubmit={dataSubmit}
                                        errors={errors}
                                        isSubmitting={isSubmitting}
                                        touched={touched}
                                    />
                                </div>

                            </Form>
                        )}
                    </Formik>
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

export default connect (mapStateToProps, mapDispatchToPRops)(Checkout)