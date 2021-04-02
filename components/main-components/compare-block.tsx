import Slider from "react-slick"
import {useEffect, useState} from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import {useRouter} from "next/router";


/*---Styles----*/
import classes from '../../styles/main-components/compare-block.module.sass'

/*---Components---*/
import {CostReplace} from "../secondary-func"
import {LazyLoadImage} from "../preloader/Lazy-Load-Image"

/*----Redux----*/
import {setCompare} from "../../redux/actions/actioncompare"

/*----Hooks----*/
import {AxiosApi} from "../../hooks/axios.hook"


/*---Bootstrap icon---*/
import {ChevronDown, X} from "react-bootstrap-icons"

/*----Interfaces----*/
interface ICompare{
    brand: string,
    category: {},
    code: string,
    images: {
        image_srcset: string,
        original_image: string
    }[],
    name: string,
    price: {
        price: number,
        old_price: number
    },
    shop: {
        name: string,
        slug: string
    },
    slug: string,
    warehouse: {
        name: string,
        slug: string
    }
}


export function CompareBlock({compare, setCompare}: {compare: ICompare[], setCompare:(compare:ICompare[])=>void}){

    const {t} = useTranslation()
    const [toggleShow, setShow] = useState(false)
    const [compareProducts, setCompareProd] = useState<ICompare[]>([])
    const router = useRouter()

    const arr = [1,2,3,4]

    const {request, error, loading} = AxiosApi()

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        className: classes['compare-carousel']

    }

    useEffect(()=>{
        setCompareProd(compare)
    }, [compare])

    const deleteCompare = async (warehouse_slug, slug)=>{
        //setCompareProd(compareProducts.filter(item=>item.warehouse.slug!==warehouse_slug && item.slug!==slug))

        await request(`${process.env.COMPARES_REMOVE['ru']}/${warehouse_slug}/${slug}`, 'DELETE')
            .then(result=>{
                setCompare(result.data.items)
                //setCompareProd(result.data.items)
                //getCompare('ru')
            }).catch(e=>console.log(''))

    }



    const clearAll = async()=>{
        setCompareProd([])
        await request(`${process.env.COMPARES_REMOVE_ALL['ru']}`, 'DELETE')
            .then(result=>{
                setCompare([])
                // getCompare('ru')
            }).catch(e=>console.log(''))
    }

    const isHidden = ()=>{

        if(!compareProducts.length){
            return true
        }else if(router.pathname.match(/(\/products\/)|(\/recently-viewed)/gi)===null){
            return true
        }

        return false
    }



    return(
        <div className={`position-fixed ${classes['wrap-compare-list']} 
        ${toggleShow?``:`${classes['hide']}`} 
        ${isHidden()?`${classes['visible-hidden']}`:''}`}>
            <div>
                <div className={classes['toggle-button']}>
                    <button onClick={()=>setShow(!toggleShow)}>
                        <ChevronDown />
                    </button>
                </div>
            </div>
            <div>
                <div className={`d-flex justify-content-between mb-3 mt-3 ${classes['top-block-compare']}`}>
                    <p>{t('compare-button.compare')} ({compareProducts.length})</p>
                    <div className={`${classes['compare-buttons']} d-flex`}>
                        <button className={classes['button-clear']} onClick={clearAll} disabled={loading}>{t('compare-button.clear-all')}</button>
                        <button className={classes['compare-button']} onClick={()=>{
                            router.push('/compare')
                        }} >{t('compare-button.compare')}</button>
                    </div>
                </div>
                <Slider {...settings}>
                    {
                        arr.map((item, index)=>{
                            if(compareProducts && compareProducts[index]){
                                return(
                                    <div className={`${classes['item-compare']} d-flex position-relative`} key={index}>
                                        <button
                                            className={`position-absolute ${classes['button-delete-compare']}`}
                                            onClick={()=>deleteCompare(compareProducts[index].warehouse.slug, compareProducts[index].slug)}
                                        ><X /></button>
                                        <div className={`${classes['picture-compare-product']} col-4`}>
                                            <LazyLoadImage image={{
                                                src: compareProducts[index].images[0].original_image,
                                                srcSet: compareProducts[index].images[0].image_srcset,
                                                alt: compareProducts[index].name
                                            }}/>
                                        </div>
                                        <div className={`${classes['info-product-compare']} col-8 d-flex flex-column justify-content-center`}>
                                            <Link href={'/'}>
                                                <a>{compareProducts[index].name}</a>
                                            </Link>
                                            <p>{CostReplace(compareProducts[index].price.price+'')} UZS</p>
                                        </div>
                                    </div>
                                )
                            }else{
                                return(
                                    <div className={`${classes['empty-block']} col-3`} key={index} />
                                )
                            }
                        })
                    }
                </Slider>
            </div>
        </div>
    )
}

