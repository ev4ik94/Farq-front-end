import Link from 'next/link'
import {useTranslation} from "react-i18next"
import {useRef} from 'react'
import {useRouter} from "next/router"

/*---Components----*/
import {LazyLoadImage} from "../../preloader/Lazy-Load-Image"
import {CostReplace} from "../../secondary-func"
import {Preloader} from "../../preloader/Preloader"

/*---Icons---*/
import {X, Plus, ChevronLeft, ChevronRight} from 'react-bootstrap-icons'
import {Save} from "../../icons/Save"

/*---Styles---*/
import classes from '../../../styles/pages-components/compare/compare-list-products.module.sass'
import {useEffect, useState} from "react";
import {setCompare} from "../../../redux/actions/actioncompare";


/*----Hooks---*/
import {AxiosApi} from "../../../hooks/axios.hook"

/*---Interfaces----*/
interface ICompares{
    id: number,
    brand: {},
    category?: {},
    code: string,
    images: {
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


const recently = [
    {
        id: 128,
        image_urls :[
            {
                original_image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6394/6394628_sd.jpg;maxHeight=1000;maxWidth=1000',
                image_srcset: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6394/6394628_sd.jpg;maxHeight=1000;maxWidth=1000'
            }
        ],
        name: 'Recently Prod',
        price: 150000
    }
]


export function CompareListProducts({compares, openModal, setCompare}:{
    compares:ICompares[],
    openModal:(value:boolean)=>void,
    setCompare: (compare: ICompares[])=>void
}){
    const {t} = useTranslation()
    const [count, setCount] = useState(0)
    const [recentlyProd, setRecently] = useState([])
    const [comparesProd, setComparesProd] = useState([])
    const router = useRouter()
    const {request} = AxiosApi()
    const carouselCompare = useRef(null)
    var translateVal = 0



    useEffect(()=>{
        setCount(compares.length)
        setComparesProd(compares)
        carouselControls()
    }, [compares])



    useEffect(()=>{
        setRecently(recently)
    }, [])

    const recentlyAdd = ()=>{
        if(recentlyProd.length<4){
            setRecently([...recentlyProd, recently[0]])
        }
    }

    const recentlyRemove = (id)=>{
        setRecently(recentlyProd.filter((item, index)=>index!==recentlyProd.length-1))
    }

    const addCompare = async(warehouse_slug, slug)=>{
        if(comparesProd.length<4){
            await request(`${process.env.COMPARES_ADD['ru']}/${warehouse_slug}/${slug}`).then(result=>{
                setComparesProd(result.data.items)
            }).catch(e=>console.log(e.message))
        }

    }

    const removeCompare = async(warehouse_slug, slug, preloader)=>{
        preloader.classList.add('d-flex')

        await request(`${process.env.COMPARES_REMOVE['ru']}/${warehouse_slug}/${slug}`, 'DELETE')
            .then(result=>{
                preloader.classList.remove('d-flex')
                setCompare(result.data.items)
                if(!result.data.items.length){
                    router.back()
                }
            }).catch(e=>console.log(''))



    }



    const carouselControls = async(control='')=>{
        const k = carouselCompare.current.parentElement.offsetWidth

        const countEl = Array.from(carouselCompare.current.children).length
        const g = Math.ceil(countEl / 4)
        const b = (350+30) * g

        if(k<(countEl*380)){
            hideShowButtons('show','both')
        }

        switch (control){
            case 'left':
                if(translateVal!=0){
                    translateVal += (350+30)
                    hideShowButtons('show','left')
                }

                carouselCompare.current.style.transform = `translateX(${translateVal}px)`
                break
            case 'right':

                if(translateVal*(-1) <= b){
                    translateVal -= (350+30)
                    console.log(translateVal)
                }


                carouselCompare.current.style.transform = `translateX(${translateVal}px)`
                break
            default:
                return
        }

    }

    const hideShowButtons = (event, value)=>{

        const btnL = document.getElementById('btn-arrow-left')
        const btnR = document.getElementById('btn-arrow-right')
        switch(value){
            case 'left':
                if(event==='show'){
                    btnL.classList.remove(classes['hide-btn'])
                }else{
                    btnL.classList.add(classes['hide-btn'])
                }

                break
            case 'right':
                if(event==='show'){
                    btnR.classList.remove(classes['hide-btn'])
                }else{
                    btnR.classList.add(classes['hide-btn'])
                }
                break
            case 'both':
                if(event==='show'){
                    btnL.classList.remove(classes['hide-btn'])
                    btnR.classList.remove(classes['hide-btn'])
                }else{
                    btnL.classList.add(classes['hide-btn'])
                    btnR.classList.add(classes['hide-btn'])
                }
                btnL.classList.add(classes['hide-btn'])
                btnR.classList.add(classes['hide-btn'])
                break
            default:
                break
        }
    }



    return(
        <div className='position-relative overflow-hidden'>
            <button className={`${classes['btn-controls-carousel']} ${classes['btn-left']}`}
                    onClick={()=>carouselControls('left')} id='btn-arrow-left'>
                <ChevronLeft />
            </button>
            <button className={`${classes['btn-controls-carousel']} ${classes['btn-right']}`}
                    onClick={()=>carouselControls('right')} id='btn-arrow-right'>
                <ChevronRight />
            </button>
            <div className={`d-flex ${classes['compare-list-carousel']}`} ref={carouselCompare}>
                {
                    comparesProd.map((item, index)=>{

                        return(
                            <div key={index} className=''>

                                    <button onClick={(e)=>{
                                        const parent = e.currentTarget.parentElement
                                        const preloader = parent.querySelector(`.${classes['preloader-compare']}`)
                                        removeCompare(item.warehouse.slug, item.slug, preloader)
                                    }} className={`${classes['delete-compare']}`}><X /></button>

                                <div className={`${classes['compare-image']} position-relative`}>
                                    <div className={classes['preloader-compare']}><Preloader /></div>
                                    <div>
                                        <LazyLoadImage image={{
                                            src: item.images[0].original_image,
                                            srcSet: item.images[0].image_srcset,
                                            alt: ''
                                        }}/>
                                    </div>
                                    <button onClick={()=>openModal(true)}>{t('compare-page.products-list-button1')}</button>
                                </div>

                                <div className={`${classes['description-compare']}`}>
                                    <p>
                                        <Link href={'/'}>
                                            <a>{item.name}</a>
                                        </Link>
                                    </p>
                                    <p className='mb-0'>
                                        <span className='font-weight-bold'>{t('compare-page.products-list-model')}:</span>
                                        &nbsp;
                                    </p>
                                    <p className='mb-0'>
                                        <span className='font-weight-bold'>{t('compare-page.products-list-brand')}:</span>
                                        &nbsp;
                                    </p>

                                </div>

                                <div className={`${classes['prices-compare']} mt-3`}>
                                    <div>
                                        <p className='mb-0'>{t('compare-page.products-list-price-title1')}</p>
                                        <p className='font-weight-bold mb-0'>{CostReplace(item.price.price + '')} UZS</p>
                                    </div>
                                    <div>
                                        <p className='mb-0'>{t('compare-page.products-list-price-title2')}</p>
                                        <p className='font-weight-bold mb-0'>{CostReplace(item.price.old_price + '')} UZS</p>
                                    </div>
                                </div>
                                <button className={`${classes['button-save-compare']} d-flex align-items-center mt-3 mb-3`}>
                                    <Save />
                                    <p className='mb-0'>{t('account.address-input-button1')}</p>
                                </button>
                            </div>
                        )
                    })
                }
                {/*{*/}
                {/*    count < 4 ?(<>{*/}
                {/*        recentlyProd.map((item, index)=>{*/}

                {/*            return(*/}
                {/*                <div key={index} className={`${classes['item-recently']}`} data-id={index}>*/}
                {/*                    <div className={`${classes['controls-recently-prod']} d-flex justify-content-between`}>*/}
                {/*                        <button onClick={()=>addCompare(item.warehouse.slug, item.slug)}>{t('compare-page.products-list-button')}</button>*/}
                {/*                        <button onClick={()=>recentlyRemove(item.id)}><X /></button>*/}
                {/*                    </div>*/}
                {/*                    <div className={`${classes['compare-image']}`}>*/}
                {/*                        <div className='p-3'>*/}
                {/*                            <LazyLoadImage image={{*/}
                {/*                                src: item.images[0].original_image,*/}
                {/*                                srcSet: item.images[0].image_srcset,*/}
                {/*                                alt: ''*/}
                {/*                            }}/>*/}
                {/*                        </div>*/}
                {/*                        <button>{t('compare-page.products-list-button1')}</button>*/}
                {/*                    </div>*/}

                {/*                    <div className={`${classes['description-compare']}`}>*/}
                {/*                        <p>*/}
                {/*                            <Link href={'/'}>*/}
                {/*                                <a>{item.name}</a>*/}
                {/*                            </Link>*/}
                {/*                        </p>*/}
                {/*                        <p className='mb-0'>*/}
                {/*                            <span className='font-weight-bold'>{t('compare-page.products-list-model')}:</span>*/}
                {/*                            &nbsp;*/}
                {/*                        </p>*/}
                {/*                        <p className='mb-0'>*/}
                {/*                            <span className='font-weight-bold'>{t('compare-page.products-list-brand')}:</span>*/}
                {/*                            &nbsp;*/}
                {/*                        </p>*/}

                {/*                    </div>*/}

                {/*                    <div className={`${classes['prices-compare']} mt-3`}>*/}
                {/*                        <div>*/}
                {/*                            <p className='mb-0'>{t('compare-page.products-list-price-title1')}</p>*/}
                {/*                            <p className='font-weight-bold mb-0'>{CostReplace(item.price + '')} UZS</p>*/}
                {/*                        </div>*/}
                {/*                        <div>*/}
                {/*                            <p className='mb-0'>{t('compare-page.products-list-price-title2')}</p>*/}
                {/*                            <p className='font-weight-bold mb-0'>{CostReplace(item.price + '')} UZS</p>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}

                {/*                    <button className={`${classes['button-save-compare']} d-flex align-items-center mt-3 mb-3`}>*/}
                {/*                        <Save />*/}
                {/*                        <p className='mb-0'>{t('account.address-input-button1')}</p>*/}
                {/*                    </button>*/}
                {/*                </div>*/}
                {/*            )*/}
                {/*        })*/}
                {/*    }*/}

                {/*        <div className={`${classes['button-add']} d-flex align-items-center p-3 */}
                {/*        ${!recentlyProd.length?classes['button-add-sin']:''}`}>*/}
                {/*            <button onClick={()=>recentlyAdd()} disabled={recentlyProd.length===4}>*/}
                {/*                <Plus />*/}
                {/*                <p>{t('compare-page.products-list-button2')}</p>*/}
                {/*            </button>*/}
                {/*        </div>*/}
                {/*    </>):('')*/}
                {/*}*/}
            </div>

        </div>
    )
}