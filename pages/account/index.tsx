import Link from "next/link"
import {useRouter} from "next/router"
import {useTranslation} from "react-i18next"

/*---Components----*/
import MainComponent from "../../components/Main-Component"
import {BreadCrumbs} from "../../components/pages-component/BreadCrumbs"
import {CardLinkGroup} from '../../components/pages-component/account/card-link-group'

/*---Bootstrap----*/
import {Container} from "react-bootstrap"
import classes from "../../styles/pages-components/account/account.module.sass"

/*----Virt Data----*/
import {link} from '../../virtDb/arrLinksAccount'
import {useEffect, useState} from "react";

/*---Hooks---*/
import {useAuth} from "../../hooks/authentication.hook"

/*---Interface---*/
interface IUser{
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    address: string,
    phone: string
}

function Account(){

    const router = useRouter()
    const {t} = useTranslation()
    const {checkAuth, getUserData} = useAuth()
    const [userData, setUserData] = useState<IUser | null>(null)


    useEffect(()=>{
        if(!checkAuth()){
            router.push('/')
        }else{
            setUserData(getUserData())
        }

    }, [])


    return (
        <MainComponent>
            <Container fluid className={`${classes['wrap-top-content']}`}>
                <Container>
                    <div className={`${classes['bread-crumbs']}`}>
                        <p className='mb-0'>
                            <Link href='/'>
                                <a>Farq</a>
                            </Link>
                        </p>
                        <p className='mb-0'>{t('Твой акаунт')}</p>
                    </div>
                    <div className={`${classes['hello-block']}`}>
                        <p className="mb-0">Hi, {userData!==null && userData.first_name?userData.first_name:
                            (userData!==null&&userData.email?userData.email:'')}</p>
                        <p className="mb-0">{t('account.main')}</p>
                    </div>
                </Container>
            </Container>
            <CardLinkGroup />
        </MainComponent>
    )
}

export default Account