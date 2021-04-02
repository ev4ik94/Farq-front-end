import {useRouter} from "next/router"
import {useTranslation} from "react-i18next"
import {useState} from 'react'



/*----Styles----*/
import classes from '../../../styles/pages-components/account/account-slug.module.sass'



/*--Interface----*/
interface IObjects{
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

export function PaymentMethod({object}:{object:IObjects[]}){

    const router = useRouter()
    const {t} = useTranslation()
    const MainLink = object.filter(item=>item.slug===router.query.slug).length?
        object.filter(item=>item.slug===router.query.slug)[0]:null

    const [showForm, setShowForm] = useState(false)

    return(
        <div className={`${classes['payment-method-wrap']}`}>
            <h1>{MainLink!==null && MainLink.name?MainLink.name['ru']:''}</h1>
            <p className='mb-0'>{t('account.payment-description')}</p>
        </div>
    )
}


