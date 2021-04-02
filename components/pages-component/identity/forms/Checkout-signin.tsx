import Link from 'next/link'
import {useTranslation} from "react-i18next"

/*---components---*/
import {SignIn} from "./SignIn"


/*---Styles---*/
import classes from '../../../../styles/pages-components/identity/checkout-signin.module.sass'
import {useState} from "react";
import {AlertMessage} from "./Alert-message";

export function CheckoutSignIn(){
    const {t} = useTranslation()
    const [errors, setErrors] = useState([])
    const [isSuccessSubmit, setSuccessSubmit] = useState(false)
    const [alertSuccess, setAlertSuccess] = useState('')

    return(
        <div className={`d-flex justify-content-around`}>
            <SignIn setSuccessSubmit={setSuccessSubmit} errors={errors} setErrors={setErrors} setAlertSuccess={setAlertSuccess}/>
            <div className={`${classes['vertical-line']} position-relative`} data-title={t('word.or')}>
                <div className=''/>
            </div>
            <AlertMessage isSuccess={isSuccessSubmit} errors={errors} alertSuccess={alertSuccess}/>
            <ContinueCheckout />
        </div>
    )
}

function ContinueCheckout(){
    return(
        <div className={`${classes['wrap-continue']}`}>
            <h3 className='pt-3 pb-3'>Новый пользователь</h3>
            <p>Don't have an account? No problem, you can check out as a guest. You'll have the option to create an account during checkout.</p>
            <Link href={`/checkout`}>
                <a>Продолжить как гость</a>
            </Link>
        </div>
    )
}