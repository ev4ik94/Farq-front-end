import Link from "next/link"
import {LazyLoadImage} from "../preloader/Lazy-Load-Image"
import {useRef, useEffect, useState} from "react"
import Slider from "react-slick"
import {useTranslation} from "react-i18next"


/*---Styles---*/
import classes from "../../styles/main-components/carousel-products-list.module.sass"

/*---Icons---*/
import {ChevronLeft, ChevronRight} from "react-bootstrap-icons"
import {TimeClock} from "../icons/time-oclock"
import {CostReplace} from "../secondary-func";


/*---Interfaces----*/
interface IProducts{
    id: number,
    brand: {},
    category?: {},
    code: string,
    images:{
        image_srcset: string,
        original_image: string,
    },
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



export function CarouselProductsList({products}:{products:IProducts[]}){

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
        <>
            <div className={`d-flex ${classes['title-block']}`}>
                <div className='d-flex'>
                    <TimeClock />
                    <p className={`position-relative mb-0`}>{t('recently.block-title')}</p>
                </div>
                <div className={`${classes['vertical-line']}`}/>
                <Link href={`/`}>
                    <a>{t('header.dropdown-recently.title-link')}</a>
                </Link>
            </div>
            <div className={`${classes['top-element-carousel']} position-relative`}>
                <button className={'position-absolute'} onClick={clickPrev}>
                    <ChevronLeft />
                </button>
                <div className={`col-11 overflow-hidden mx-auto`} id='carousel-product'>
                    <Slider {...settings} ref={carousel}>
                        {
                            products.map(item=>{

                                return(
                                    <div key={item.id}>
                                        <div className={`${classes['top-info']}`}>
                                            <Link href={`/product/${item.warehouse.slug}/${item.slug}`}>
                                                <a>
                                                    <div className={`${classes['picture-product']}`}>
                                                        <LazyLoadImage image={{
                                                            src: item.images[0].original_image,
                                                            srcSet: item.images[0].image_srcset,
                                                            alt: ''
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
        </>
    )

}