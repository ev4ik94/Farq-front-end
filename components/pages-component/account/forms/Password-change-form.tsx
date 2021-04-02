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

export function PasswordForm({object, setPerson, setActiveForm}:{
    object:Person,
    setPerson:(value:any)=>void,
    setActiveForm:(value:string|null)=>void}){

    const {t} = useTranslation()
    const [passwordType, setPasswordType] = useState(true)

    const PasswordSchema = Yup.object().shape({
        currentPassword: Yup.string().required(t('input.error-message1')),
        newPassword: Yup.string().required('Required'),
        confirmPassword: Yup.string()
            .test('newPassword', t('input.error-message-equal-password"'), function(value:string) {
                return value === this.resolve(Yup.ref('newPassword'))
            }).required('Required')

    })

    const initialVal = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    }

    const submitForm = (values)=>{
        setPerson({...object, values})
    }

    const changeType = (eve)=>{
        eve.preventDefault()
        let parent = eve.currentTarget.parentElement
        let input = parent.querySelector('input')
        let type = input.getAttribute('type')
        eve.currentTarget.innerText = type==='password'?'hide':'show'
        input.setAttribute('type', type==='password'?'text':'password')


    }

    return(
        <div className={`${classes['wrap-form-person-details']} col-lg-6 pl-0`}>
            <div>
                <p className='mb-0'>{t('account.personal-details-text')}</p>
                <p className='mb-0'>{t('account.personal-details-text4')}</p>
            </div>

            <Formik
                initialValues={initialVal}
                enableReinitialize
                validationSchema={PasswordSchema}
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
                        <div className={classes['wrap-change-password']}>
                            <div>
                                <div className='pt-3 pb-3'>
                                    <p className='mb-0'><label className='mb-0'>{t('account.personal-details-input3')}</label></p>
                                    <p className='position-relative'>
                                        <Field name='currentPassword'
                                               type='password'
                                               className={`${errors.currentPassword && touched.currentPassword ? classes['error-field']:''} w-100`}
                                               value={values.currentPassword}
                                               onBlur={handleBlur}
                                               onChange={handleChange}
                                        />
                                        <button className='position-absolute' onClick={changeType}>show</button>
                                    </p>
                                </div>
                                <div className='pt-3 pb-3'>
                                    <p className='mb-0'><label className='mb-0'>{t('account.personal-details-input4')}</label></p>
                                    <p className='position-relative'>
                                        <Field name='newPassword'
                                               type='password'
                                               className={`${errors.newPassword && touched.newPassword ? classes['error-field']:''} w-100`}
                                               value={values.newPassword}
                                               onBlur={handleBlur}
                                               onChange={handleChange}
                                        />
                                        <button className='position-absolute' onClick={changeType}>show</button>
                                    </p>
                                </div>

                                <div className='pt-3 pb-3'>
                                    <p className='mb-0'><label className='mb-0'>{t('identity.form-signup-label3')}</label></p>

                                    <p className='position-relative'>
                                        <Field name='confirmPassword'
                                               type='password'
                                               className={`${errors.confirmPassword && touched.confirmPassword ? classes['error-field']:''} w-100`}
                                               value={values.confirmPassword}
                                               onBlur={handleBlur}
                                               onChange={handleChange}
                                        />
                                        <button className='position-absolute' onClick={changeType}>show</button>
                                    </p>
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