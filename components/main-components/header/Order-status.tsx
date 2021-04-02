import {useTranslation} from "react-i18next"

/*---styles---*/
import classes from '../../../styles/main-components/header/order-status-dropdown.module.sass'

/*---Icons----*/
import {Box} from '../../icons/Box'
import {X} from 'react-bootstrap-icons'

export function OrderStatus(){
    const {t} = useTranslation()
    return(
        <div className={`${classes['wrap-order-status']}`}>
            <div className={`d-flex align-items-center position-relative`}>
                <Box />
                <h2 className='font-weight-bold'>{t('header.dropdown-order-status.title-link')}</h2>
                {/*<button className='position-absolute'><X /></button>*/}
            </div>
            <div className='d-flex col-lg-8 position-relative justify-content-lg-start'>
                <div className='col-lg-8'>
                    <div>
                        <p className='mb-0'>{t('header.dropdown-order-status.text1')}</p>
                        <p className='mb-0'>{t('header.dropdown-order-status.text2')}</p>
                    </div>
                    <p className='mb-0'>{t('header.dropdown-order-status.text3')}</p>
                    <button className='w-100'>{t('header.dropdown-order-status.button')}</button>
                </div>
                <div className='position-absolute'>
                    <img src="/images/order-status.png" alt=""/>
                </div>
            </div>
        </div>
    )
}