import {useTranslation} from "react-i18next"

/*-----Styles----*/
import classes from "../../styles/pages-components/products/products.module.sass"


/*---Icons---*/
import {Star} from "react-bootstrap-icons"


export function Rating(){
    const {t} = useTranslation()
    return(
        <div className={`${classes['rating-block']} mt-3 mb-3`}>
            <button className={'pr-1'}>
                <Star/>
            </button>
            <button className={'pr-1'}>
                <Star/>
            </button>
            <button className={'pr-1'}>
                <Star/>
            </button>
            <button className={'pr-1'}>
                <Star/>
            </button>
            <button className={'pr-3'}>
                <Star/>
            </button>
            <span>(0)</span>
            <span>{t('rating')}</span>
        </div>
    )
}