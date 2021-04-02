import {useTranslation} from "react-i18next"
import {useRouter} from "next/router"


/*---Styles---*/
import classes from '../../../styles/pages-components/checkout/tracker.module.sass'

export function Tracker(){

    const router = useRouter()

    const {t} = useTranslation()


    const isActive = (value)=>{

        if(value==='payment' && router.pathname.match(/payment/gi)){
            return true
        }else if(value==='review' && router.pathname.match(/review/gi)){
            return true
        }

        return false

    }
    return(
        <div className={`d-flex justify-content-between pt-3 pb-3 ${classes['main-container']}`}>
            <h1>{t('checkout-page.title')}</h1>
            <div className="d-flex pt-3">
                <div className={`${classes['item-tracker-value']} ${classes['active']} d-flex`}>
                    <div>
                        <span>1</span>
                    </div>
                    <p className={`mb-0`}>{t('checkout-page.item-1')}</p>
                </div>

                <div className={`${classes['item-tracker-value']} ${(isActive('payment') || isActive('review'))?classes['active']:''} d-flex`}>
                    <div>
                        <span>2</span>
                    </div>
                    <p className={`mb-0`}>{t('checkout-page.item-3')}</p>
                </div>

                <div className={`${classes['item-tracker-value']} ${isActive('review')?classes['active']:''} d-flex`}>
                    <div>
                        <span>3</span>
                    </div>
                    <p className={`mb-0`}>{t('checkout-page.item-4')}</p>
                </div>

            </div>
        </div>
    )
}