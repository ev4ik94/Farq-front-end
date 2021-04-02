import Slider from "react-slick"
import Link from 'next/link'
import {useRef, useState} from 'react'
import { useTranslation } from 'react-i18next'


/*----Bootstrap-icons---*/
import {ChevronRight, ChevronLeft} from "react-bootstrap-icons"
import classes from "../../../styles/pages-components/home/carousel-products.module.sass"


/*---Components---*/
import {LazyLoadImage} from "../../preloader/Lazy-Load-Image"
import {CostReplace} from "../../secondary-func"


/*---Interface----*/
interface IProducts {
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



export function CarouselProducts2({products}:{products:IProducts[]}){

    const carousel = useRef(null)
    const {t} = useTranslation()

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: false,
        arrows: false
    }


    const clickNext = ()=>{
        carousel.current.slickNext()
    }

    const clickPrev = ()=>{
        carousel.current.slickPrev()
    }


    return(
        <div className={`${classes['element-carousel']} position-relative`}>
            <p className='mb-0 font-weight-bold'>{t('carousel-products-home.title')}</p>
            <p>{t('carousel-products-home.subTitle')}</p>
            <button className={'position-absolute'} onClick={clickPrev}>
                <ChevronLeft />
            </button>
            <div className='col-11 overflow-hidden mx-auto' id='carousel-product'>
                <Slider {...settings} ref={carousel}>
                    {
                        products.map((item, index)=>{
                            return(
                                <div key={index}>
                                    <div className={`${classes['top-info']}`}>
                                        <Link href={`/product/${item.warehouse.slug}/${item.slug}`}>
                                            <a>
                                                <div className={`${classes['picture-product']}`}>
                                                    <LazyLoadImage image={{
                                                        src: item.images[0].original_image,
                                                        srcSet: item.images[0].image_srcset,
                                                        alt: item.name
                                                    }}/>
                                                </div>
                                            </a>
                                        </Link>
                                        <Link href={`/product/${item.warehouse.slug}/${item.slug}`}>
                                            <a>
                                                <p>{item.name}</p>
                                            </a>
                                        </Link>
                                    </div>
                                    <div className={`${classes['bot-info']}`}>
                                        <p className='mb-0'>{CostReplace(item.price.price + '')} UZS</p>
                                        <p className='mb-0'>{CostReplace(item.price.old_price + '')} UZS</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>

            </div>
            <button className={'position-absolute'} onClick={clickNext}>
                <ChevronRight />
            </button>
        </div>
    )
}