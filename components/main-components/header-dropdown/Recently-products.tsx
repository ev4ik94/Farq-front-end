import Link from "next/link"
import React, {useState, useEffect} from "react"
import {useTranslation} from "react-i18next"

/*----Components----*/
import {CarouselProductsBuy} from "../header/Carousel-products-buy"



export function RecentlyProducts({recently, popular}){

    const {t} = useTranslation()


    return(
        <div className='d-flex'>
            {
                !recently.length?(<div className='col-lg-3 d-flex flex-column justify-content-center pr-0'>
                    <p>{t('header.dropdown-recently.title2')}</p>
                    <Link href='/'>
                        <a>{t('header.dropdown-recently.link')}</a>
                    </Link>
                </div>):('')
            }
            <div className={recently.length?'col-lg-12 border-0':'col-lg-9 border-0'}>
                {
                    !recently.length?(<p className='mt-3 font-weight-bold'>{t('header.dropdown-recently.text')}</p>)
                        :(
                            <div className='d-flex pt-3 pb-3'>
                                <p className='font-weight-bold mb-0 mr-3'>{t('recently.block-sub-title-2')}</p>
                                <p className='mb-0'>
                                    <Link href={'/recently-viewed'}>
                                        <a>{t('recently.block-sub-title-link')}</a>
                                    </Link>
                                </p>
                            </div>
                        )
                }
                <CarouselProductsBuy products={recently.length?recently:popular} count={recently.length?3:2}/>
            </div>
            <style jsx>
                {
                    `
                        a{
                            color: #007aff!important;
                            vertical-align: middle;
                        }
                        
                        a:hover{text-decoration: underline!important;}
                        
                        a:after{
                            content: '';
                            display: inline-block;
                            vertical-align: sub;
                            width: 20px;
                            height: 20px;
                            margin-left: 10px;
                            background-position: center;
                            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='rgba(0,122,255,1)' class='bi bi-arrow-right' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z'/%3E%3C/svg%3E");
                            background-size: contain;
                        }
                                            
                    `
                }
            </style>
        </div>
    )
}