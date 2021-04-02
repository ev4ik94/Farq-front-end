import {useRouter} from "next/router"
import {useTranslation} from "react-i18next"

/*---Components---*/
import MainComponent from "../../../components/Main-Component"
import {Order} from '../../../components/pages-component/account/Order'
import {PaymentMethod} from '../../../components/pages-component/account/Payment-method'
import {Addresses} from "../../../components/pages-component/account/Addresses"
import {PersonalDetails} from "../../../components/pages-component/account/Personal-details"
import {UserProducts} from "../../../components/pages-component/account/User-products"

/*---VirtDb----*/
import {link} from "../../../virtDb/arrLinksAccount"

/*---Icons----*/
import {TimeClock} from "../../../components/icons/time-oclock"
import {Card} from "../../../components/icons/Card"
import {AddressBook} from "../../../components/icons/Address-book"
import {PersonCircle, ChevronLeft, Search, ChevronRight, Clipboard} from "react-bootstrap-icons"



/*----Bootstrap----*/
import {Container} from 'react-bootstrap'
import classes from "../../../styles/pages-components/account/account-slug.module.sass";
import Link from "next/link";


/*--Interface----*/
interface IObject{
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



export default function AccountRoutes(){
    const router = useRouter()
    const {t} = useTranslation()
    const mainLink = link.filter(item=>item.slug===router.query.slug).length?
        link.filter(item=>item.slug===router.query.slug)[0].name['ru']:''

    const switchPages = (object:IObject[])=>{
        switch(router.query.slug){
            case 'order-history':
                return <Order object={object}/>
            case 'credit-cards':
                return <PaymentMethod object={object}/>
            case 'address':
                return <Addresses object={object}/>
            case 'personal-details':
                return <PersonalDetails object={object}/>
            case 'your-products':
                return <UserProducts object={object}/>
            default:
                return ''
        }
    }

    return(
        <MainComponent>
            <Container fluid>
                <div className={`${classes['bread-crumbs']}`}>
                    <p className='mb-0'>
                        <Link href='/'>
                            <a>Farq</a>
                        </Link>
                    </p>
                    <p className='mb-0'>
                        <Link href='/account'>
                            <a>{t('Твой акаунт')}</a>
                        </Link>
                    </p>
                    <p className='mb-0'>{mainLink}</p>
                </div>

                <div className={`${classes['wrap-container-account']} row`}>
                    <SideMenu />
                    {switchPages(link)}
                </div>
            </Container>
        </MainComponent>
    )
}


function SideMenu(){
    const {t} = useTranslation()
    const router = useRouter()

    const HTMLIcons = (icon)=>{
        switch(icon){
            case 'TimeClock':
                return <TimeClock />
            case 'Card':
                return <Card />
            case 'AddressBook':
                return <AddressBook />
            case 'PersonCircle':
                return <PersonCircle />
            default:
                return ''
        }
    }

    return(
        <div className={`col-lg-3`}>
            <ul className={`${classes['side-nav-links']}`}>
                <li>
                    <Link href='/account'>
                        <a>
                            <span><ChevronLeft /></span>
                            <span>{t('Твой акаунт')}</span>
                        </a>
                    </Link>
                </li>
                {
                    link.map(item=>{
                        return(
                            <li key={item.id} className={`${item.slug===router.query.slug?`${classes['active']}`:''}`}>
                                <Link href={`/account/${item.slug}`}>
                                    <a>
                                        <span>{HTMLIcons(item.icon)}</span>
                                        <span>{item.name['ru']}</span>
                                    </a>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

