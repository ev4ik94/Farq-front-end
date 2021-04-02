import {useTranslation} from "react-i18next"
import * as Yup from "yup"
import {Field, Form, Formik} from "formik"

/*---Style---*/
import classes from "../../../../styles/pages-components/account/account-slug.module.sass"


/*--Interface----*/
interface Person{
    first_name: string,
    last_name: string,
    email: string,
    password: string
}


export function NameForm({object, setPerson, setActiveForm, saveChange}:{
    object:Person,
    setPerson:(value:any)=>void,
    setActiveForm:(value:string|null)=>void
    saveChange: (value:any)=>void
}){

    const {t} = useTranslation()

    const AddressSchema = Yup.object().shape({
        first_name: Yup.string()
            .min(4, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        last_name: Yup.string()
            .min(4, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required')
    })

    const initialVal = {
        first_name: object!==null && object.first_name ?object.first_name:'',
        last_name: object!==null && object.last_name ?object.last_name:''
    }

    const submitForm = (values)=>{
        saveChange(values)
    }


    return(
        <div>
            <p className='font-weight-bold'>{'Edit yor Name'}</p>
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
                        <div>
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