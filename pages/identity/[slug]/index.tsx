import {useRouter} from "next/router"
import {useState} from "react"

/*---Components----*/
import MainComponent from "../../../components/Main-Component"
import {SignIn} from "../../../components/pages-component/identity/forms/SignIn"
import {SignUp} from "../../../components/pages-component/identity/forms/SignUp"
import {CheckoutSignIn} from "../../../components/pages-component/identity/forms/Checkout-signin"
import {AlertMessage} from "../../../components/pages-component/identity/forms/Alert-message"


/*---Bootstrap---*/
import {Container} from 'react-bootstrap'


/*---Styles---*/
import classes from '../../../styles/pages-components/identity/forms.module.sass'





export default function Identity(){
    const router = useRouter()
    const {query} = router
    const [errors, setErrors] = useState([])
    const [isSuccessSubmit, setSuccessSubmit] = useState(false)
    const [alertSuccess, setAlertSuccess] = useState('')

    const switchForms = ()=>{
        switch(query.slug){
            case 'signin':
                return <SignIn setSuccessSubmit={setSuccessSubmit} errors={errors} setErrors={setErrors} setAlertSuccess={setAlertSuccess}/>
            case 'signup':
                return <SignUp setSuccessSubmit={setSuccessSubmit} errors={errors} setErrors={setErrors} setAlertSuccess={setAlertSuccess}/>
            case 'checkout_signin':
                return <CheckoutSignIn />
            default:
                return ''
        }
    }

    return(
        <MainComponent>
            <div className={`${classes['wrap-forms']}`}>
                <Container>
                    {switchForms()}
                    <AlertMessage isSuccess={isSuccessSubmit} errors={errors} alertSuccess={alertSuccess}/>
                </Container>

            </div>
        </MainComponent>
    )
}

