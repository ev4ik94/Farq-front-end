import {useState, useEffect} from 'react'
import {useTranslation} from "react-i18next"


/*---Style---*/
import classes from '../../../styles/pages-components/compare/rating-review-compare.module.sass'



export function CompareReviewRating(){
    const {t} = useTranslation()


    return(
        <div>
            <div className={`${classes['title-characters-table']} d-flex align-items-center`}>
                <h3 className='mb-0'>{t('compare-page.characters-table-title-Review')}</h3>
            </div>
            <div>
                <p>/-----------------------------------------/</p>
                <p>/-----------------------------------------/</p>
            </div>
        </div>
    )
}