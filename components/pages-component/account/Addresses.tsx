import {useRouter} from "next/router"
import {useTranslation} from "react-i18next"
import {useEffect, useState} from "react"
import * as Yup from "yup"
import {Field, Form, Formik} from "formik"

/*---Styles----*/
import classes from "../../../styles/pages-components/account/account-slug.module.sass"

/*---Bootstrap----*/
import {Alert} from 'react-bootstrap'

/*---Components----*/
import {MaskInput} from "../checkout/masked-input"


/*----Hooks----*/
import {AxiosApi} from "../../../hooks/axios.hook"
import {useAuth} from "../../../hooks/authentication.hook"


/*-----Icons---*/
import {Plus, X} from "react-bootstrap-icons"


/*--Interface----*/

interface IObjects{
    id: number,
    slug: string,
    name: {
        ru: string,
        uz: string
    },
    description: string,
    icon: string,
    link_name: string
}

interface IAddress{
    id: number,
    name: string,
    lastName: string,
    address: string,
    city: string,
    country: string,
    phone: string,
    addressNickname: string,
    defaultAddress: boolean

}


export function Addresses({object}:{object:IObjects[]}){
    const router = useRouter()
    const {t} = useTranslation()
    const MainLink = object.filter(item=>item.slug===router.query.slug).length?
        object.filter(item=>item.slug===router.query.slug)[0]:null

    const {request, loading} = AxiosApi()

    const [showForm, setShowForm] = useState(false)
    const [successSubmitting, setSuccessSubmitting] = useState(false)
    const [showAlert, setShowAlert] = useState(true)
    const [valuesAddress, setValuesAddress]  = useState<IAddress[]>([])
    const [editAddress, setEditAddress] = useState(0)

    const deleteAddress = (id)=>{
        setValuesAddress(valuesAddress.filter(item=>item.id!==id))
        setShowForm(false)
        setEditAddress(0)
    }

    useEffect(()=>{
        getAddress()
    }, [router])

    const getAddress = async()=>{

        await request(process.env.API_GET_ADDRESS_LIST['ru'])
            .then(result=>{
                console.log(result)
            })
            .catch(e=>console.log(e.message))

    }



    return(
        <div className={`${classes['address-add-wrap']} col-lg-9`}>
            <h1>{MainLink!==null && MainLink.name?MainLink.name['ru']:''}</h1>
            <p>{t('account.address-title')}</p>

            <div className='col-lg-8 pl-0 mt-5'>
                {
                    successSubmitting ? ( <Alert variant='success' show={showAlert} onClose={() => setShowAlert(false)}>
                        <button className='float-right' onClick={()=>setShowAlert(false)}><X /></button>
                        This is a  alert with{' '}

                    </Alert>):''
                }
                {
                    valuesAddress.length ? (<div className={classes['address-list']}>
                        {
                            valuesAddress.map(item=>{

                                return(
                                    <div className='d-flex justify-content-between' key={item.id}>
                                        <div className={`${item.defaultAddress?classes['default-address']:''} position-relative`}>
                                            <h4>{item.name}, {item.address}</h4>
                                            <p>{item.name} {item.lastName}<br/>
                                            {item.country},{item.city}<br/>
                                            {item.address}<br/>
                                            {item.phone}</p>
                                        </div>
                                        <div className={`${classes['controls-address-item']} d-flex flex-column`}>
                                            <button onClick={()=>{
                                                setEditAddress(item.id)
                                                setShowForm(true)
                                            }}>{t('account.address-address-button')}</button>
                                            <button onClick={()=>deleteAddress(item.id)}>{t('account.address-address-button2')}</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>) : ''
                }
                {
                    showForm ? (<AddAddressForm
                        setShowForm={setShowForm}
                        setSuccessSubmitting={setSuccessSubmitting}
                        setValuesAddress={setValuesAddress}
                        valuesAddress={valuesAddress}
                        editAddress={editAddress}
                        setEditAddress={setEditAddress}
                    />) : (
                        <div className={classes['add-new-address-block']}>
                            <p className='font-weight-bold'>{t('account.address-title-add')}</p>
                            <button className={`${classes['button-add-card']} d-flex`} onClick={()=>setShowForm(!showForm)}>
                                <div><Plus /></div>
                                <p className='mb-0'>{t('account.address-button-add')}</p>
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}


function AddAddressForm({
                            setShowForm,
                            setSuccessSubmitting,
                            valuesAddress,
                            setValuesAddress,
                            editAddress,
                            setEditAddress
}:{
    setShowForm:(e:any)=>void,
    setSuccessSubmitting:(value:any)=>void,
    valuesAddress:IAddress[],
    setValuesAddress: (value:IAddress[])=>void,
    editAddress: number,
    setEditAddress:(value:number|null)=>void}){

    const {t} = useTranslation()
    const [defaultAddress, setDefaultAddress] = useState(false)
    const [editAddressValues, setEditAddressValues] = useState(null)
    const [userData, setUserData] = useState(null)
    const {request, loading} = AxiosApi()
    const {getUserData} = useAuth()


    const ph = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/

    useEffect(()=>{
        if(editAddress!==0){
            setEditAddressValues(valuesAddress.filter(item=>item.id===editAddress).length?
                valuesAddress.filter(item=>item.id===editAddress)[0]:null)
        }
    }, [editAddress])

    useEffect(()=>{
        const data = getUserData()

        setUserData({
            first_name: data.first_name?data.first_name:'',
            last_name: data.last_name?data.last_name:'',})

    }, [])




    const AddressSchema = Yup.object().shape({
        first_name: Yup.string()
            .min(4, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        last_name: Yup.string()
            .min(4, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        address: Yup.string().required('Required'),
        city: Yup.string().default('Tashkent'),
        country: Yup.string(),
        phone: Yup.string()
            .matches(ph, 'Phone error').required(),
        name: Yup.string()
    })

    const initialVal = {
        first_name: userData!==null && userData.first_name ?userData.first_name:'',
        last_name: userData!==null && userData.last_name ?userData.last_name:'',
        address: editAddressValues!==null && editAddressValues.address ?editAddressValues.address:'',
        city: editAddressValues!==null && editAddressValues.city ?editAddressValues.city:'Tashkent',
        country: 'Uzbekistan',
        phone: editAddressValues!==null && editAddressValues.phone ?editAddressValues.phone:'',
        name: editAddressValues!==null && editAddressValues.addressNickname ?editAddressValues.addressNickname:''

    }

    const submitForm = async(values)=>{
        let data = values

        // setSuccessSubmitting(true)
        // let arr = valuesAddress
        // arr.push(data)
        //
        // setValuesAddress(arr)
        // setShowForm(false)
        // setEditAddress(0)

        await request(process.env.API_ADD_ADDRESS['ru'], 'POST', data)
            .then(result=>{
                console.log(result)
            })
            .catch(e=>{
                console.log(e.message)
            })
    }

    const editAddressSubmit = (values)=>{
        let data = values
        data.defaultAddress = defaultAddress
        data.id = editAddress
        let arr = valuesAddress.filter(item=>item.id!==editAddress)
        arr.push(data)
        setValuesAddress(arr)
        setShowForm(false)
        setEditAddress(0)
    }

    return(
        <Formik
            initialValues={initialVal}
            enableReinitialize
            validationSchema={AddressSchema}
            onSubmit={(values) => {
                if(editAddress===0){
                    submitForm(values)
                }else{
                    editAddressSubmit(values)
                }
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
                <Form onSubmit={handleSubmit} className={classes['form-add-address']}>
                    <p className='font-weight-bold'>{t('account.address-button-add')}</p>
                    <div className={classes['inputs-form-address-block']}>
                        <div className='d-flex'>
                            <div className='pl-3 pr-3 pt-1 pb-1 col-lg-6'>
                                <p className='mb-0'><label className='mb-0'>{t('identity.form-signup-label1')}</label></p>
                                <Field name='first_name'
                                       className={`${errors.first_name && touched.first_name ? classes['error-field']:''} w-100`}
                                       value={values.first_name}
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                />
                            </div>
                            <div className='pl-3 pr-3 pt-1 pb-1 col-lg-6'>
                                <p className='mb-0'><label className='mb-0'>{t('identity.form-signup-label2')}</label></p>
                                <Field name='last_name'
                                       className={`${errors.last_name && touched.last_name ? classes['error-field']:''} w-100`}
                                       value={values.last_name}
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className='pl-3 pr-3 pt-1 pb-1'>
                            <p className='mb-0'><label className='mb-0'>{t('account.address-input-label1')}</label></p>
                            <Field name='address'
                                   className={`${errors.address && touched.address ? classes['error-field']:''} w-100`}
                                   value={values.address}
                                   onBlur={handleBlur}
                                   onChange={handleChange}
                            />
                        </div>
                        <div className={`d-flex`}>
                            <div className='pl-3 pr-3 pt-1 pb-1 col-lg-6'>
                                <p className='mb-0'><label className='mb-0'>{t('checkout-page.form-shipping-label3')}</label></p>
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
                            <div className='pl-3 pr-3 pt-1 pb-1 col-lg-6'>
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

                        <div>
                            <div className='pl-3 pr-3 pt-1 pb-1 col-lg-6'>
                                <p className='mb-0'><label className='mb-0'>{t('identity.form-signup-label4')}</label></p>
                                <Field name='phone'
                                       className={`${errors.phone && touched.phone ? classes['error-field']:''} w-100`}
                                       value={values.phone}
                                       onBlur={handleBlur}
                                       onChange={handleChange}
                                       component = {MaskInput}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='mt-3'>
                        <div className='pl-3 pr-3 pt-1 pb-1 col-lg-6'>
                            <p className='mb-0'><label className='mb-0'>{t('account.address-input-label3')}</label></p>
                            <Field name='name'
                                   className={`${errors.name && touched.name ? classes['error-field']:''} w-100`}
                                   value={values.name}
                                   onBlur={handleBlur}
                                   onChange={handleChange}

                            />
                            <small>{t('account.address-input-label4')}</small>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <div className='pl-3 pr-3 pt-1 pb-1 d-flex align-items-center'>
                            <input type="checkbox" checked={defaultAddress} onChange={()=>setDefaultAddress(!defaultAddress)}/>
                            <label className='mb-0 pl-3'>{t('account.address-input-label5')}</label>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <div className='pl-3 pr-3 pt-1 pb-1 row align-items-center justify-content-end'>
                            <button className={classes['button-cancel']} onClick={()=> {
                                setShowForm(false)
                                setEditAddress(0)
                            }}>{t('account.address-input-button')}</button>
                            <button type='submit' className={`${classes['button-save']} mr-0`}>{t('account.address-input-button1')}</button>
                        </div>
                    </div>
                </Form>
            )}


        </Formik>
    )
}