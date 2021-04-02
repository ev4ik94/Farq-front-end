import { useTranslation } from 'react-i18next'
import Link from 'next/link'

/*---Bootstrap-components---*/
import {Container} from "react-bootstrap"

/*---Components---*/
import {LazyLoadImage} from "../../preloader/Lazy-Load-Image"

/*---Icons---*/
import {TimeClock} from '../../icons/time-oclock'

/*---Styles----*/
import classes from '../../../styles/pages-components/home/recently-viewed.module.sass'
import {CostReplace} from "../../secondary-func";

/*---Interface----*/

interface IRecently{
    id: number,
    brand: {},
    category?: {},
    code: string,
    images: {
        image_srcset: string,
        original_image: string,
    }[],
    name: string,
    price: {
        old_price: number|null,
        price: number
    },
    slug: string,
    warehouse: {
        name: string,
        slug: string
    }
}

export function RecentlyViewed({recently}:{recently:IRecently[]}){

    const {t} = useTranslation()


    return(
        <Container fluid className={`${classes['recently-wrap']} d-lg-block d-none`}>
            <div className={'d-flex pl-0'}>
                <div className={`col-lg-3 d-flex justify-content-center flex-column`}>
                    <div className={'d-flex justify-content-center'}>
                        <div className={`d-flex flex-column justify-content-center`}>
                            <TimeClock />
                        </div>
                        <p className={`position-relative`}>{t('recently.block-title')}</p>
                    </div>
                    <p className='text-center'>{t('recently.block-sub-title')}</p>
                </div>
                <div className={`col-lg-9 d-flex`}>
                    {
                        (recently || []).map((item, index)=>{
                            if(index<3){
                                return(
                                    <div className={`${classes['recent-item']} d-flex pl-0`} key={index}>
                                        <Link href={`/product/${item.warehouse.slug}/${item.slug}`}>
                                            <a className='d-flex'>
                                                <div className={`${classes['picture-item']}`}>
                                                    <LazyLoadImage image={{
                                                        src: item.images[0].original_image,
                                                        srcSet: item.images[0].image_srcset,
                                                        alt: item.name
                                                    }}/>
                                                </div>
                                            </a>
                                        </Link>

                                        <div className={`col-lg-7`}>
                                            <p className='mb-0'>{t('recently.block-text1')}</p>
                                            <div className={'mt-1'}>
                                                <Link href={`/product/${item.warehouse.slug}/${item.slug}`}>
                                                    <a><p className='mb-0'>{item.name}</p></a>
                                                </Link>
                                                <div></div>
                                                <p className={'font-weight-bold mb-0 mt-1'}>{CostReplace(item.price.price + '')} UZS</p>
                                                <p className={'font-weight-bold mb-0 mt-1'}>{CostReplace(item.price.old_price + '')} UZS</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }

                    <Link href={'/recently-viewed'}>
                        <a className={classes['button-see-more']}>{t('recently-button')}</a>
                    </Link>
                </div>
            </div>
        </Container>
    )
}


