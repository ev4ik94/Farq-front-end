import {useTranslation} from "react-i18next";
import {useRouter} from 'next/router'
import {useState, useEffect} from "react";
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import Link from "next/link";
import axios from "axios";


/*---Styles----*/
import classes from "../../../../styles/pages-components/identity/forms.module.sass";


/*---Hooks----*/
import {useAuth} from "../../../../hooks/authentication.hook"
import {AxiosApi} from "../../../../hooks/axios.hook"


/*---Icons----*/
import {GoogleLogo} from "../../../icons/Google-logo";
import {AppleLogo} from "../../../icons/Apple-logo";

/*---Interfaces---*/
interface IErrors{
    field: string,
    message: string
}

export function SignIn({setSuccessSubmit, errors, setErrors, setAlertSuccess}:
                           {
                               setSuccessSubmit: (value:boolean)=>void,
                               errors: IErrors[],
                               setErrors: (value: IErrors[])=>void,
                               setAlertSuccess: (value: string)=>void
                           }){
    const {t} = useTranslation()
    const router = useRouter()
    const [showPass, setShowPass] = useState(false)
    const {checkAuth, login} = useAuth()
    const {request, loading} = AxiosApi()

    useEffect(()=>{
        if(checkAuth()){
            router.push('/account')
        }
    }, [router])


    const SignInSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required(t('input.error-message1')),
        password: Yup.string()
            .min(8, 'Too Short!')
            .max(50, 'Too Long!')
            .required(t('input.error-message'))

    })

    const submitForm = async (values)=>{

        const data = {
            email: values.email,
            password: values.password
        }

        await request(process.env.API_LOGIN['ru'], 'POST', data).then(result=>{
            router.push('/account')
            login(result.data.userData)
        }).catch((e)=>{
            const {response, config} = e
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
            initialValues={{
                email: '',
                password: ''

            }}
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
              })=>(

                <Form className={`pt-3 col-lg-6 mx-auto ${classes['form-wrap']}`} onSubmit={handleSubmit}>
                    <h3 className={`text-center pb-3 pt-3`}>{t('identity.form-title')}</h3>

                    <div className={`${classes['inputs-group']}`}>
                        <div className={`${classes['group-forms']} position-relative`}>
                            <label className={`${classes['label-f']} ${errors.email && touched.email ? classes['error-label']:''}`}>{t('identity.form-input1')}</label>
                            <Field name='email'
                                   required
                                   className={`${errors.email && touched.email ? classes['error-field']:''} ${classes['input-f']}`}
                                   value={values.email}
                                   onBlur={(e)=>{
                                       handleBlur(e)
                                       if(!values.email.length){
                                           e.currentTarget.parentElement.classList.remove(classes['input-focus'])
                                       }
                                   }}
                                   onChange={handleChange}
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
                                   className={`${errors.password && touched.password ? classes['error-field']:''}`}
                                   value={values.password}
                                   onBlur={(e)=>{
                                       handleBlur(e)
                                       if(!values.password.length){
                                           e.currentTarget.parentElement.classList.remove(classes['input-focus'])
                                       }
                                   }}
                                   onChange={handleChange}
                                   onFocus={(e)=>{
                                       e.currentTarget.parentElement.classList.add(classes['input-focus'])
                                   }}
                            />
                            <div className={`${errors.password && touched.password?'d-block':'d-none'} ${classes['errors-message']}`}>
                                <p className='mb-0'>{errors.password}</p>
                            </div>
                        </div>

                        <button
                            className={`${classes['button-form']} mt-3`}
                        >
                            {t('identity.form-button2')}
                        </button>

                        <button type='submit' className={`${classes['submit-button']} mt-3 ${loading?classes['button-disabled']:''}`} disabled={loading}>
                            {t('identity.form-button3')}
                        </button>
                    </div>

                    <div className={`pt-3 ${classes['buttons-social']}`}>
                        <button type='submit' className={`${classes['submit-button']} mt-3 d-flex justify-content-center`}>
                            <GoogleLogo />
                            <div className='d-flex flex-column justify-content-center'>
                                {t('identity.form-button4')}
                            </div>
                        </button>
                        <button type='submit' className={`${classes['submit-button']} mt-3 d-flex justify-content-center`}>
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
                        <p className='mb-0'>{t('identity.form-text1')}&nbsp;
                            <Link href='/identity/signup'><a>{t('identity.form-text2')}</a></Link></p>
                    </div>
                </Form>
            )}
        </Formik>
    )
}