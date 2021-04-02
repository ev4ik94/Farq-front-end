import {useTranslation} from "react-i18next";
import {useState} from "react";
import * as Yup from "yup";
import classes from "../../../../styles/pages-components/account/account-slug.module.sass";
import {Field, Form, Formik} from "formik";


/*--Interface----*/

interface Person{
    first_name: string,
    last_name: string,
    email: string,
    password: string
}

export function EmailForm({object, setPerson, setActiveForm, saveChange}:{
    object:Person,
    setPerson:(value:any)=>void,
    setActiveForm:(value:string|null)=>void
    saveChange: (value:any)=>void
}){

    const {t} = useTranslation()
    const [passwordType, setPasswordType] = useState(true)

    const AddressSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required(t('input.error-message1')),
        confirmEmail: Yup.string().email('Invalid email')
            .test('email', t('input.error-message-equal-email"'), function(value:string) {
                return value === this.resolve(Yup.ref('email'))
            }).required('Required'),
        password: Yup.string().required('Required')

    })

    const initialVal = {
        email: '',
        confirmEmail: '',
        password: ''
    }

    const submitForm = (values)=>{
        saveChange(values)
    }

    return(
        <div className={`${classes['wrap-form-email-address']} col-lg-6 pl-0`}>
            <div>
                <p className='mb-0'>{t('account.personal-details-text1')}</p>
                <p className='mb-0'>{object!==null && object.email?object.email:''}</p>
            </div>
            <div>
                <p className='mb-0'>{t('account.personal-details-text2')}</p>
                <p className='mb-0'>{t('account.personal-details-text3')}</p>
            </div>
            <Formik
                initialValues={initialVal}
                enableReinitialize
                validationSchema={AddressSchema}
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
                      isSubmitting,
                      touched
                  })=>(
                    <Form onSubmit={handleSubmit} className={classes['form-edit-personal']}>
                        <div className=''>
                            <div>
                                <div className='pt-3 pb-3'>
                                    <p className='mb-0'><label className='mb-0'>{t('account.personal-details-input')}</label></p>
                                    <Field name='email'
                                           className={`${errors.email && touched.email ? classes['error-field']:''} w-100`}
                                           value={values.email}
                                           onBlur={handleBlur}
                                           onChange={handleChange}
                                    />
                                </div>
                                <div className='pt-3 pb-3'>
                                    <p className='mb-0'><label className='mb-0'>{t('account.personal-details-input1')}</label></p>
                                    <Field name='confirmEmail'
                                           className={`${errors.confirmEmail && touched.confirmEmail ? classes['error-field']:''} w-100`}
                                           value={values.confirmEmail}
                                           onBlur={handleBlur}
                                           onChange={handleChange}
                                    />
                                </div>

                                <div className='pt-3 pb-3'>
                                    <p className='mb-0'><label className='mb-0'>{t('identity.form-input2')}</label></p>

                                    <p className='position-relative'>
                                        <Field name='password'
                                               type={passwordType?'password':'text'}
                                               className={`${errors.password && touched.password ? classes['error-field']:''} w-100`}
                                               value={values.password}
                                               onBlur={handleBlur}
                                               onChange={handleChange}
                                        />
                                        <button className='position-absolute' onClick={()=>setPasswordType(!passwordType)}>{
                                            passwordType?'show':'hide'
                                        }</button>
                                    </p>
                                    <small>{t('account.personal-details-input2')}</small>
                                </div>
                            </div>

                            <div className='mt-3'>
                                <div className='pl-3 pr-3 pt-1 pb-1 row align-items-center justify-content-end'>
                                    <button className={classes['button-cancel']} onClick={()=> {
                                        setActiveForm(null)
                                    }}>{t('account.address-input-button')}</button>
                                    <button type='submit' className={`${classes['button-save']} mr-0`}>{t('account.address-input-button1')}</button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}