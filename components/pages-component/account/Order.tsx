import {useRouter} from "next/router"
import {useTranslation} from "react-i18next"
import {useState} from "react"
import Link from "next/link"

/*---Virt Db---*/
import {link} from "../../../virtDb/arrLinksAccount"

/*---Styles---*/
import classes from "../../../styles/pages-components/account/account-slug.module.sass"

/*---ICons----*/
import {ChevronRight, Clipboard, Search} from "react-bootstrap-icons"


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


export function Order({object}:{object:IObjects[]}){

    const router = useRouter()
    const title = object.filter(item=>item.slug===router.query.slug).length?
        object.filter(item=>item.slug===router.query.slug)[0].name['ru']:''
    const {t} = useTranslation()

    const [searchOrder, setSearchOrder] = useState('')
    const [order, setOrder] = useState([])

    const handlerSearch = (e)=>{
        setSearchOrder(e.target.value)
    }

    return(
        <div className={`col-lg-9 ${classes['wrap-order-content']}`}>
            <h1>{title}</h1>
            <div className={`${classes['block-find-order']} row position-relative`}>
                <div className={`col-lg-8 pl-0`}>
                    <input type="text" value={searchOrder} onChange={handlerSearch} placeholder={t('account.order-input')}/>
                    <button><Search /></button>
                </div>
                <div className={`${classes['guest-order-link']} col-lg-4`}>
                    <p>{t('account.order-text1')}</p>
                    <p>{t('account.order-text2')}</p>
                    <Link href={'/'}>
                        <a>
                            <span>{t('account.order-text3')}</span>
                            <span className='ml-1'><ChevronRight /></span>
                        </a>
                    </Link>
                </div>
            </div>
            <div className={`${classes['result-order-list']}`}>
                {
                    !order.length ? (
                        <div className={`${classes['empty-result']}`}>
                            <p className='text-center'>{t('account.order-text4')}</p>
                            <div className='mx-auto'><Clipboard /></div>
                        </div>):(<></>)
                }
            </div>
            <div className={`${classes['info-blocks-order']} row justify-content-around`}>
                <div className={`col-lg-5 row flex-column justify-content-between`}>
                    <h4>{t('account.order-text5')}</h4>
                    <p>{t('account.order-text6')}</p>
                    <Link href='/'><a>
                        <span>{t('account.order-text7')}</span>
                        <span className='ml-1'><ChevronRight /></span>
                    </a></Link>
                </div>
                <div className={`col-lg-5 row flex-column justify-content-between`}>
                    <h4>{t('account.order-text8')}</h4>
                    <p>{t('account.order-text9')}</p>
                    <Link href='/'><a>
                        <span>{t('account.order-text10')}</span>
                        <span className='ml-1'><ChevronRight /></span>
                    </a></Link>
                </div>
            </div>
        </div>
    )
}