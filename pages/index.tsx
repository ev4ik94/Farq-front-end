import MainComponent from '../components/Main-Component'
import React, {useEffect, useState} from 'react'
import Skeleton from "react-loading-skeleton"
import {useRouter} from "next/router"

/*---Bootstrap-components---*/
import {Container} from "react-bootstrap"

/*---Components---*/

import CarouselBanner from "../components/pages-component/home-components/carousel-banner"
import {CarouselProducts} from "../components/pages-component/home-components/carousel-products"
import {RecentlyViewed} from "../components/pages-component/home-components/recently-viewed"
import {CarouselProducts2} from "../components/pages-component/home-components/carousel-products-2"
import {OffersPartners} from "../components/pages-component/home-components/offers-partners"
import {SubscribeForm} from '../components/main-components/subscribe-form'

/*----Virt Db----*/
import {offers} from '../virtDb/offers-partner'


/*----Redux----*/
import {connect} from 'react-redux'


/*---Fetch Data ----*/

function FetchBanner(){
    return new Promise((resolve:(value: {}[])=>void) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    src: '/images/84Gy_pP-XCaUW955.jpg'
                },
                {
                    id: 2,
                    src: '/images/116.jpg'
                },
                {
                    id: 3,
                    src: '/images/HomeConnect_OVERALL_open_Keyvisual_v03.jpg'
                }
            ]);
        }, 500);
    });
}

function FetchOffers(){
    return new Promise((resolve:(value:{}[])=>void) => {
        setTimeout(() => {
            resolve(offers);
        }, 500);
    });
}



function Home({popular, recently}){

    const [loadingState, setStateLoading] = useState({
        bannerLoading: true,
        offersLoading: true
    })
    const [banner, setBanner] = useState([])
    const [offersData, setOffers] = useState([])




    useEffect(()=>{
        if(loadingState.bannerLoading){
            FetchBanner().then(result=>{
                setBanner(result)
                setStateLoading({...loadingState, bannerLoading: false})
            })
        }
        if(loadingState.offersLoading){
            FetchOffers().then(result=>{
                setOffers(result)
                setStateLoading({...loadingState, offersLoading: false})
            })
        }
    }, [loadingState])




    return(

        <MainComponent>
            <div>
                <Container fluid style={{height: '600px'}} className={`d-flex pt-5`}>
                    {
                        loadingState.bannerLoading?(<div className='col-6'><Skeleton width={'100%'} height={'100%'}/></div>):(<CarouselBanner banner={banner}/>)
                    }
                    <CarouselProducts products={popular} />
                </Container>
                {
                    recently.length?(<RecentlyViewed recently={recently}/>):('')
                }
                <Container fluid className='pt-3'>
                    <CarouselProducts2 products={popular} />
                    <OffersPartners offers={offersData}/>
                </Container>

            </div>
        </MainComponent>
    )
}

export async function getStaticProps(context) {

    const lang = 'ru'

    const res = await fetch(`${process.env.API_PRODUCTS_HOME[lang]}?perPage=12`, {
        credentials: 'include'
    })

    let data = false

    if(res.status===200 || res.status===201){
        data = await res.json()
    }else{
        return{
            props: {
                serverData:{
                    products: null,
                    error: {
                        state: true,
                        status: res.status
                    }
                }
            }

        }
    }

    return {
        props: {serverData:{
                products:data, error: {state:false, status: null}
            }
        }
    }


}



const mapStateToProps = state=>({
    popular: state.popular,
    recently: state.recently
})

export default connect(mapStateToProps)(Home)
