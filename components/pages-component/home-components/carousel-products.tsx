import Slider from "react-slick"
import Link from 'next/link'
import {useRef, useState} from 'react'



/*---Styles---*/
import classes from '../../../styles/pages-components/home/carousel-products.module.sass'

/*----Bootstrap-icons---*/
import {ChevronRight, ChevronLeft} from "react-bootstrap-icons"

/*---Components----*/
import {LazyLoadImage} from '../../preloader/Lazy-Load-Image'
import {CostReplace} from "../../secondary-func";


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





export function CarouselProducts({products}:{products:IProducts[]}){

    const carousel = useRef(null)

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
        <div className={`col-6 ${classes['wrap-carousel-products']} d-flex flex-column justify-content-between`}>
            <div className={`${classes['top-element-carousel']} position-relative`}>
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

            <div className={`${classes['bot-element-product']}`}>
                <div className={'d-flex justify-content-between'}>
                    <p className={`font-weight-bold mb-0`}>
                        <span>Сделка</span>
                        недели
                    </p>
                    <p className={'mb-0'}>
                        <Link href={'/'}>
                            <a>Посмотреть еще сделки (14)</a>
                        </Link>
                    </p>
                    <p className={'mb-0'}>До конца осталось 07:05:23</p>
                </div>
                <div className={`d-flex pt-3`}>
                    <div className={`col-lg-4 ${classes['picture-product-bot']}`}>
                        <div>
                            <img src="https://marketplace.elliesoft.com/cache/image/md/uploads/product/sku/2020/11/23/1606126903/2111pm3Asia/Tashkent43/mikrovolnovaya-pech-artel-20mx63.jpg" alt=""/>
                        </div>
                    </div>
                    <div className={`col-lg-8`}>
                        <p className={classes['product-name']}>Ноутбук Acer - 15.6" Touch-Screen - AMD Ryzen 5 - 12GB Памяти - 256GB SSD - Natural Silve</p>
                        <div></div>
                        <p className={`font-weight-bold mb-0`}>1230000 UZS</p>
                        <p className='mb-0'>1430000 UZS</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


