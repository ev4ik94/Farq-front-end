import {useTranslation} from "react-i18next";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import Link from "next/link";




/*-----Bootstrap-----*/
import {OverlayTrigger, Tooltip} from 'react-bootstrap'

/*----Icons-----*/
import {Exclamation} from "react-bootstrap-icons"


/*---Interface----*/
interface ISignUpSchema{
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    password_confirm: string,
    phone: string
}

interface IErrors{
    field: string,
    message: string
}

/*----Styles---*/
import classes from "../../../../styles/pages-components/identity/forms.module.sass";

/*----Components---*/
import {MaskInput} from "../../checkout/masked-input"



/*---Icons----*/
import {GoogleLogo} from "../../../icons/Google-logo";
import {AppleLogo} from "../../../icons/Apple-logo";

/*----Hooks----*/
import {useAuth} from "../../../../hooks/authentication.hook"
import {AxiosApi} from "../../../../hooks/axios.hook"


export function SignUp(
    {setSuccessSubmit, errors, setErrors, setAlertSuccess}:
        {
            setSuccessSubmit: (value:boolean)=>void,
            errors: IErrors[],
            setErrors: (value: IErrors[])=>void,
            setAlertSuccess: (value:string)=>void
        }){
    const router = useRouter()
    const {t} = useTranslation()
    const [showPass, setShowPass] = useState(false)
    const {checkAuth, login} = useAuth()
    const {request, loading} = AxiosApi()



    useEffect(()=>{
        if(checkAuth()){
            router.push('/account')
        }
    }, [router])


    const ph = /^(\s*)?(0+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/


    const SignInSchema = Yup.object().shape({
        first_name: Yup.string().required(t('input.error-message1')),
        last_name: Yup.string().required(t('input.error-message1')),
        email: Yup.string().email('Invalid email').required(t('input.error-message1')),
        password: Yup.string()
            .min(8, 'Too Short!')
            .max(50, 'Too Long!')
            .required(t('input.error-message')),
        password_confirm: Yup.string()
            .test('password', t('input.error-message-equal-password"'), function(value:string) {
                return value === this.resolve(Yup.ref('password'))
            })
            .required(t('input.error-message')),
        phone: Yup.string()
            .matches(ph, 'Phone error'),

    })
    const initialValues: ISignUpSchema = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirm: '',
        phone: ''

    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {t('identity.form-signup-alert-text')}
        </Tooltip>
    )

    const submitForm = async (values)=>{
        const data = {
            firstname: values.first_name,
            lastname: values.last_name,
            email: values.email,
            phone: values.phone,
            password: values.password,
            password_confirmation: values.password_confirm,
        }


        await request(process.env.API_REGISTER['ru'], 'POST', data).then(result=>{
            setTimeout(()=>{
                router.push('/account')
            }, 1000)
            setAlertSuccess(result.data.message)
            setErrors([])
            setSuccessSubmit(true)
            login(result.data.userData)
        }).catch((e)=>{
            const {response, config} = e
            setSuccessSubmit(false)
            let arrErr = []
            if(response.data.errors){

                for(let value in response.data.errors){
                    arrErr.push({
                        field: value,
                        message: response.data.errors[value]
                    })
                }

            }else if(response.data.message){
                arrErr.push({
                    field: '',
                    message: response.data.message
                })
            }

            setErrors(arrErr)
        })



    }



    return(
        <Formik
            initialValues={initialValues}
            validationSchema={SignInSchema}
            onSubmit={(values) => {
                submitForm(values)
            }}
        >
            {({
                  errors,
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  touched
              })=>{

                return(
                    (

                        <Form className={`pt-3 col-lg-6 mx-auto ${classes['form-wrap']}`} onSubmit={handleSubmit}>
                            <h3 className={`text-center pb-3 pt-3`}>{t('identity.form-signup-title')}</h3>

                            <div className={`${classes['inputs-group']}`}>
                                <div className={`${classes['group-forms']} position-relative`}>
                                    <label className={`${classes['label-f']} ${errors.first_name && touched.first_name ? classes['error-label']:''}`}>{t('identity.form-signup-label1')}</label>
                                    <Field name='first_name'
                                           className={`${errors.first_name && touched.first_name ? classes['error-field']:''} ${classes['input-f']}`}
                                           value={values.first_name}
                                           onBlur={(e)=>{
                                               handleBlur(e)
                                               if(!values.first_name.length){
                                                   e.currentTarget.parentElement.classList.remove(classes['input-focus'])
                                               }
                                           }}
                                           onChange={(e)=>{
                                               handleChange(e)
                                               e.currentTarget.parentElement.classList.add(classes['input-focus'])
                                           }}
                                           onFocus={(e)=>{
                                               e.currentTarget.parentElement.classList.add(classes['input-focus'])
                                           }}

                                    />
                                    <div className={`${errors.first_name && touched.first_name?'d-block':'d-none'} ${classes['errors-message']}`}>
                                        <p className='mb-0'>{errors.first_name}</p>
                                    </div>
                                </div>

                                <div className={`${classes['group-forms']} position-relative`}>
                                    <label className={`${classes['label-f']} ${errors.last_name && touched.last_name ? classes['error-label']:''}`}>{t('identity.form-signup-label2')}</label>
                                    <Field name='last_name'
                                           className={`${errors.last_name && touched.last_name ? classes['error-field']:''} ${classes['input-f']}`}
                                           value={values.last_name}
                                           onBlur={(e)=>{
                                               handleBlur(e)
                                               if(!values.last_name.length){
                                                   e.currentTarget.parentElement.classList.remove(classes['input-focus'])
                                               }
                                           }}
                                           onChange={(e)=>{
                                               handleChange(e)
                                               e.currentTarget.parentElement.classList.add(classes['input-focus'])
                                           }}
                                           onFocus={(e)=>{
                                               e.currentTarget.parentElement.classList.add(classes['input-focus'])
                                           }}

                                    />
                                    <div className={`${errors.last_name && touched.last_name?'d-block':'d-none'} ${classes['errors-message']}`}>
                                        <p className='mb-0'>{errors.last_name}</p>
                                    </div>
                                </div>

                                <div className={`${classes['group-forms']} position-relative`}>
                                    <label className={`${classes['label-f']} ${errors.email && touched.email ? classes['error-label']:''}`}>{t('identity.form-input1')}</label>
                                    <Field name='email'
                                           className={`${errors.email && touched.email ? classes['error-field']:''} ${classes['input-f']}`}
                                           value={values.email}
                                           onBlur={(e)=>{
                                               handleBlur(e)
                                               if(!values.email.length){
                                                   e.currentTarget.parentElement.classList.remove(classes['input-focus'])
                                               }
                                           }}
                                           onChange={(e)=>{
                                               handleChange(e)
                                               e.currentTarget.parentElement.classList.add(classes['input-focus'])
                                           }}
                                           onFocus={(e)=>{
                                               e.currentTarget.parentElement.classList.add(classes['input-focus'])
                                           }}

                                    />
                                    <div className={`${errors.email && touched.email?'d-block':'d-none'} ${classes['errors-message']}`}>
                                        <p className='mb-0'>{errors.email}</p>
                                    </div>
                                </div>
                                <div className={`d-flex justify-content-end pb-1 pt-3`}>
                                    <button
                                        className={`${classes['button-form']}`}
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            setShowPass(!showPass)
                                        }}
                                    >
                                        {t('identity.form-button1')}
                                    </button>
                                </div>
                                <div className={`${classes['group-forms']} position-relative`}>
                                    <label className={`${classes['label-f']} ${errors.password && touched.password ? classes['error-label']:''}`}>{t('identity.form-input2')}</label>
                                    <Field name='password'
                                           type={showPass?'text':'password'}
                                           className={`${errors.password && touched.password ? classes['error-field']:''} ${classes['input-f']}`}
                                           value={values.password}
                                           onBlur={(e)=>{
                                               handleBlur(e)
                                               if(!values.password.length){
                                                   e.currentTarget.parentElement.classList.remove(classes['input-focus'])
                                               }
                                           }}
                                           onChange={(e)=>{
                                               handleChange(e)
                                               e.currentTarget.parentElement.classList.add(classes['input-focus'])
                                           }}
                                           onFocus={(e)=>{
                                               e.currentTarget.parentElement.classList.add(classes['input-focus'])
                                           }}

                                    />
                                    <div className={`${errors.password && touched.password?'d-block':'d-none'} ${classes['errors-message']}`}>
                                        <p className='mb-0'>{errors.password}</p>
                                    </div>
                                </div>

                                <div className={`${classes['group-forms']} position-relative`}>
                                    <label className={`${classes['label-f']} ${errors.password_confirm && touched.password_confirm ? classes['error-label']:''}`}>{t('identity.form-signup-label3')}</label>

                                    <Field name='password_confirm'
                                           type={showPass?'text':'password'}
                                           className={`${errors.password_confirm && touched.password_confirm ? classes['error-field']:''}`}
                                           value={values.password_confirm}
                                           onBlur={(e)=>{
                                               handleBlur(e)
                                               if(!values.password_confirm.length){
                                                   e.currentTarget.parentElement.classList.remove(classes['input-focus'])
                                               }
                                           }}
                                           onChange={(e)=>{
                                               handleChange(e)
                                               e.currentTarget.parentElement.classList.add(classes['input-focus'])
                                           }}
                                           onFocus={(e)=>{
                                               e.currentTarget.parentElement.classList.add(classes['input-focus'])
                                           }}
                                    />
                                    <div className={`${errors.password_confirm && touched.password_confirm?'d-block':'d-none'} ${classes['errors-message']}`}>
                                        <p className='mb-0'>{errors.password_confirm}</p>
                                    </div>
                                </div>

                                <div className={`${classes['group-forms']} position-relative`}>

                                    <div className={`${classes['info-button']} position-absolute`}>
                                        <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltip}
                                        >
                                            <button onClick={(e)=>e.preventDefault()}><Exclamation /></button>
                                        </OverlayTrigger>
                                    </div>
                                    <Field name='phone'
                                           className={`${errors.phone && touched.phone ? classes['error-field']:''}`}
                                           value={values.phone}
                                           style={{padding: '10px 5px'}}
                                           onBlur={(e)=>{
                                               handleBlur(e)
                                               if(!values.phone.length){
                                                   e.currentTarget.parentElement.classList.remove(classes['input-focus'])
                                               }
                                           }}
                                           onChange={(e)=>{
                                               handleChange(e)
                                               e.currentTarget.parentElement.classList.add(classes['input-focus'])
                                           }}
                                           onFocus={(e)=>{
                                               e.currentTarget.parentElement.classList.add(classes['input-focus'])
                                           }}
                                           component={MaskInput}
                                    />
                                    <div className={`${errors.phone && touched.phone?'d-block':'d-none'} ${classes['errors-message']}`}>
                                        <p className='mb-0'>{errors.phone}</p>
                                    </div>
                                </div>


                                <button type='submit' className={`${classes['submit-button']} mt-3 ${loading?classes['button-disabled']:''}`} disabled={loading}>
                                    {t('identity.form-button3')}
                                </button>
                            </div>

                            <div className={`pt-3 ${classes['buttons-social']}`}>
                                <button type='button' className={`${classes['submit-button']} mt-3 d-flex justify-content-center`}>
                                    <GoogleLogo />
                                    <div className='d-flex flex-column justify-content-center'>
                                        {t('identity.form-button4')}
                                    </div>
                                </button>
                                <button type='button' className={`${classes['submit-button']} mt-3 d-flex justify-content-center`}>
                                    <AppleLogo />
                                    <div className='d-flex flex-column justify-content-center'>
                                        {t('identity.form-button5')}
                                    </div>
                                </button>
                            </div>

                            <div className={`${classes['terms-links']}`}>
                                <p className='mb-0'>
                                    By continuing you agree to our&nbsp;
                                    <Link href='/'>
                                        <a>Terms and Conditions</a>
                                    </Link>, our<br/>
                                    <Link href='/'>
                                        <a>Privacy Policy</a>
                                    </Link>,
                                    and the <Link href='/'><a>My Farq Program Terms</a></Link>.
                                </p>
                            </div>

                            <div className={`${classes['create-account-link']}`}>
                                <p className='mb-0'>{t('identity.form-signup-button2')}&nbsp;
                                    <Link href='/identity/signin'><a>{t('identity.form-button3')}</a></Link></p>
                            </div>
                        </Form>
                    )
                )
            }}
        </Formik>
    )
}