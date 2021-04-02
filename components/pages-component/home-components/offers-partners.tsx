import { useTranslation } from 'react-i18next'
import Link from 'next/link'


/*---Styles----*/
import classes from '../../../styles/pages-components/home/offers-partner.module.sass'


/*---Components---*/
import {LazyLoadImage} from '../../preloader/Lazy-Load-Image'

/*---Interfaces----*/

// interface IOffers{
//     id: number,
//     brand: {},
//     category?: {},
//     code: string,
//     images: {
//         image_srcset: string,
//         original_image: string,
//     }[],
//     name: string,
//     price: {
//         old_price: number|null,
//         price: number
//     },
//     slug: string,
//     warehouse: {
//         name: string,
//         slug: string
//     }
//
// }

interface IOffers{
    id: number,
    name: string,
    skus: ISkus[],
    title: string
}

interface ISkus {
    id: number,
    description: string,
    image_urls: {
        org: string,
        mad: string,
        sm: string,
        xs: string
    }[],
    price: number,
    slug: string
}



export function OffersPartners({offers}:{offers:IOffers[]}){

    const {t} = useTranslation()

    return(
        <div className={`${classes['offers-list-wrap']} mt-5`}>
            <p className='font-weight-bold'>{t('offers-partner.title')}</p>
            <div className={`d-flex flex-wrap`}>
                {
                    offers.map((item, index)=>{
                        return(
                            <div className={`${classes['item-offers-partner']} col-lg-4`} key={index}>
                                <div>

                                    <div className={`${classes['product-picture']}`}>
                                        <LazyLoadImage image={{
                                            src: item.skus[0].image_urls[0].org,
                                            srcSet: item.skus[0].image_urls[0].xs,
                                            alt: item.name
                                        }}/>
                                    </div>

                                    <div className='mt-3'>
                                        <p>{item.name}</p>
                                        <p>{item.name}</p>
                                        <p>{item.skus[0].description}</p>
                                        <p>
                                            <Link href={'/'}>
                                                <a>Shop the TVs {'>'}</a>
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}