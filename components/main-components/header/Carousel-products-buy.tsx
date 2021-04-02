import {useRef} from "react";
import {useTranslation} from "react-i18next";
import Slider from "react-slick"
import Link from "next/link";
import {LazyLoadImage} from "../../preloader/Lazy-Load-Image";

/*---Styles----*/
import classes from "../../../styles/main-components/header/carousel-products-buy.module.sass";

/*---Icons---*/
import {ChevronLeft, ChevronRight} from "react-bootstrap-icons";
import {Cart} from '../../icons/Cart'
import {CostReplace} from "../../secondary-func";



/*---Interfaces----*/
interface IProducts{
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



export function CarouselProductsBuy({products, count}:{products:IProducts[], count:number}){

    const carousel = useRef(null)
    const {t} = useTranslation()


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: count,
        slidesToScroll: count,
        autoplay: false,
        arrows: false
    }

    const clickNext = ()=>{
        carousel.current.slickNext()
    }

    const clickPrev = ()=>{
        carousel.current.slickPrev()
    }
    console.log(products)

    return(
        <>
            <div className={`${classes['products-carousel-buy']} position-relative`}>
                <button className={`position-absolute ${classes['controls-button']}`} onClick={clickPrev}>
                    <ChevronLeft />
                </button>
                <div className={`col-11 overflow-hidden mx-auto`}>
                    <Slider {...settings} ref={carousel}>
                        {
                            (products || []).map((item, index)=>{

                                return(
                                    <div key={index} className='p-1'>
                                        <div className={`${classes['top-info']} d-flex`}>
                                            <div className='col-lg-5 p-0'>
                                                <Link href={`/product/${item.warehouse.slug}/${item.slug}`}>
                                                    <a>
                                                        <div className={`${classes['picture-product']} p-0`}>
                                                            <LazyLoadImage image={{
                                                                src: item.images[0].original_image,
                                                                srcSet: item.images[0].image_srcset,
                                                                alt: ''
                                                            }}/>
                                                        </div>
                                                    </a>
                                                </Link>
                                            </div>
                                            <div className='col-lg-7'>
                                                <p className='mb-0'>
                                                    <Link href={`/product/${item.warehouse.slug}/${item.slug}`}>
                                                        <a>{item.name}</a>
                                                    </Link>
                                                </p>
                                                <div>
                                                    <p className='mb-0'>{CostReplace(item.price.price + '')} UZS</p>
                                                    <p className='mb-0'>{CostReplace(item.price.old_price + '')} UZS</p>
                                                </div>
                                            </div>
                                        </div>
                                      <button className={`${classes['btn-buy-product']} col-lg-11 d-block`}>
                                          <Cart />
                                          {t('cart-button')}
                                      </button>
                                    </div>
                                )
                            })
                        }
                    </Slider>


                </div>
                <button className={`${classes['controls-button']} position-absolute`} onClick={clickNext}>
                    <ChevronRight />
                </button>
            </div>
        </>
    )
}