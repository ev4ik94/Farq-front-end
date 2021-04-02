import Link from 'next/link'
import {useTranslation} from "react-i18next"


/*----Styles---*/
import classes from '../../../styles/main-components/header/dropdown-account.module.sass'


/*---VirtData----*/
const links = [
    {
        id: 1,
        title: 'Отследить заказ',
        url: '/'
    },
    {
        id: 2,
        title: 'Заказы',
        url: '/'
    },
    {
        id: 3,
        title: 'Электронный дневник',
        url: '/'
    },
    {
        id: 4,
        title: 'Награды',
        url: '/'
    },
    {
        id: 5,
        title: 'Заглянуть в профиль',
        url: '/'
    },
    {
        id: 6,
        title: 'Кредитные карты',
        url: '/'
    },
    {
        id: 7,
        title: 'Узнать статус ремонта',
        url: '/'
    },
    {
        id: 8,
        title: 'Тарифы и Услуги',
        url: '/'
    }

]


export function DropDownAccount(){
    const {t} = useTranslation()
    return(
        <div className={`${classes['content-sign-signup']} row w-100 mx-auto position-relative`}>
            <div className={`${classes['list-links']} col-lg-3`}>
                {
                    links.map(item=>(
                        <p key={item.id}>
                            <Link href={item.url}>
                                <a>{item.title}</a>
                            </Link>
                        </p>
                    ))
                }
            </div>

            <div className={`${classes['block-sign-in']} col-lg-5 d-flex flex-column justify-content-center`}>
                <p>{t('header.dropdown-account.signin-title')}</p>
                <Link href={'/identity/signin'}>
                    <a>{t('header.dropdown-account.signin-button')}</a>
                </Link>
            </div>

            <div className={`${classes['block-sign-up']} col-lg-4`}>
                <p>{t('header.dropdown-account.signup-title')}</p>
                <p>{t('header.dropdown-account.signup-text1')}</p>
                <ul className={classes['list-signup']}>
                    <li>{t('header.dropdown-account.signup-list1')}</li>
                    <li>{t('header.dropdown-account.signup-list2')}</li>
                    <li>{t('header.dropdown-account.signup-list3')}</li>
                    <li>{t('header.dropdown-account.signup-list4')}</li>
                    <li>{t('header.dropdown-account.signup-list5')}</li>
                </ul>
                <Link href={'/identity/signup'}>
                    <a>{t('header.dropdown-account.signup-button')}</a>
                </Link>
            </div>
        </div>
    )
}