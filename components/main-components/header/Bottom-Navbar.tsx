import Link from "next/link";
import React, {useEffect, useRef, useState} from "react";
import useHttp from "../../../hooks/http.hook";
import {useTranslation} from "react-i18next"


/*---Components---*/
import {DropDownAccount} from "./Drop-down-account"
import {CarouselProductsBuy} from "./Carousel-products-buy"
import {OrderStatus} from "./Order-status"
import {RecentlyProducts} from "../header-dropdown/Recently-products"


/*---Icons---*/
import {Clock, PersonCircle} from "react-bootstrap-icons";
import {TimeClock} from "../../icons/time-oclock"
import {Save} from "../../icons/Save"


/*----Bootstrap----*/
import {DropdownButton, Nav, Navbar} from "react-bootstrap";


/*---styles----*/
import classes from "../../../styles/main-components/header.module.sass";


/*----Interfaces---*/
interface IUser{
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    address: string
}

interface IProducts{
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


export function BottomNavbar ({
                                  renderMenu,
                                  setDropDown,
                                  userData,
                                  logout,
                                  recently,
                                  popular
                              }:
                                  {
                                      renderMenu:()=>any,
                                      setDropDown:(value:any)=>void,
                                      userData: IUser,
                                      logout: ()=>void,
                                      recently: IProducts[],
                                      popular: IProducts[]
                                  }){


    const [ActiveDropdowns, setActiveDropdowns] = useState([])
    const groupButtons = useRef(null)
    const {request} = useHttp()
    const [products, setProducts] = useState([])
    const [mountHistory, setMountHistory] = useState(true)
    const {t} = useTranslation()


    useEffect(()=>{

        if(mountHistory){
            getProducts()
        }

    }, [mountHistory])

    const getProducts = async ()=>{

        await request(`${process.env.API_PRODUCTS_HOME['ru']}?perPage=12`)
            .then(result=>{
                setMountHistory(false)
                setProducts(result)

            })
    }



    useEffect(()=>{
        setDropDown(ActiveDropdowns.length)
    }, [ActiveDropdowns])


    const toggleFunc = (id, e)=>{

        if(e){
            setActiveDropdowns([...ActiveDropdowns, id])
        }else{
            setActiveDropdowns(ActiveDropdowns.filter(item=>item!=id))

        }


    }



    return(
        <Navbar expand="lg" className={`${classes['nav-bar']} flex-lg-row flex-column`}>
            <Nav className={`mr-auto col-lg-5 col-12 ${classes['top-nav-link']} justify-content-start`}>
                {renderMenu()}
            </Nav>

            <Nav className={`mr-auto col-lg-7 col-12 ${classes['top-nav-link']} ${classes['rgt-link']} justify-content-end `} id='bottom-navBar' ref={groupButtons}>
                <div className={'d-flex'}>
                    <PersonCircle className='d-lg-block d-none'/>
                    {
                        userData!==null?(
                            <DropdownButton
                                id={`dropdown-button-drop-authenticated-account`}
                                title={userData.first_name?userData.first_name:(userData.email?userData.email:'')}
                                className={classes['dropdown-account-authenticated-btn']}

                                onToggle = {(e, event, metadata)=>{
                                    toggleFunc(1, e)
                                }}

                            >
                                <p className='mb-0'>
                                    <PersonCircle className='d-lg-block d-none'/>
                                    <Link href={'/account'}>
                                        <a>Your Account</a>
                                    </Link>
                                </p>
                                <p className='mb-0'>
                                    <PersonCircle className='d-lg-block d-none'/>
                                    <button onClick={()=>logout()}>Sign Out</button>
                                </p>


                            </DropdownButton>
                        ):(
                            <DropdownButton
                                id={`dropdown-button-drop-enter-account`}
                                title={'Вход'}
                                className={classes['dropdown-account-btn']}

                                onToggle = {(e, event, metadata)=>{
                                    toggleFunc(1, e)
                                }}

                            >
                                <DropDownAccount />
                            </DropdownButton>
                        )
                    }
                </div>
                <div className={'d-flex'}>
                    <Clock className='d-lg-block d-none'/>
                    <DropdownButton
                        id={`dropdown-button-drop-recently`}
                        title={'Недавно просмотренные'}
                        className={`${classes['drop-down-recently']}`}
                        onToggle = {(e, event, metadata)=>{
                            toggleFunc(2, e)
                        }}
                    >
                        <div className='d-flex align-items-center pb-3'>
                            <TimeClock />
                            <h2 className='mb-0 font-weight-bold'>{t('header.dropdown-recently.title')}</h2>
                        </div>

                        <RecentlyProducts recently={recently} popular={popular}/>

                    </DropdownButton>
                </div>
                <div className={'d-flex'}>
                    <svg version="1.1" id="Layer_1"  x="0px" y="0px" className='d-lg-block d-none'
                         width="512px" height="512px" viewBox="0 0 512 512" style={{width: '30px', height: '30px'}}>
                        <g>
                            <path d="M287.8,240c8.8,0,16.1,7.2,16.1,16s-7,16-15.9,16h-64c-8.8,0-16-7.2-16-16s7.2-16,16-16h63 M288,224h-64
                                        c-17.6,0-32,14.4-32,32s14.4,32,32,32h64c17.6,0,32-14.4,32-32S305.6,224,288,224L288,224z"/>
                            <g>
                                <path d="M416,112H96v80h16v208h288V192h16V112z M384,384H128V192h256V384z M400,176H112v-48h288V176z"/>
                            </g>
                        </g>
                    </svg>
                    <DropdownButton
                        id={`dropdown-button-drop-order`}
                        className = {`${classes['dropdown-button-drop-order']}`}
                        title={'Статус заказа'}
                        onToggle = {(e, event,metadata)=> {
                            toggleFunc(3, e)
                        }}
                    ><OrderStatus /></DropdownButton>
                </div>
                <div className={'d-flex'}>
                    <svg height="404pt" viewBox="-58 0 404 404.54235" width="404pt" xmlns="http://www.w3.org/2000/svg" className='d-lg-block d-none'>
                        <path d="m277.527344 0h-267.257813c-5.519531 0-10 4.476562-10 10v374.527344c-.007812 7.503906 4.183594 14.378906
                            10.855469 17.808594 6.675781 3.425781 14.707031 2.828124 20.796875-1.550782l111.976563-80.269531 111.980468
                            80.265625c6.09375 4.371094 14.117188 4.964844 20.789063 1.539062 6.667969-3.425781 10.863281-10.296874
                            10.863281-17.792968v-374.527344c0-5.523438-4.480469-10-10.003906-10zm-10 384.523438-117.796875-84.441407c-3.484375-2.496093-8.171875-2.496093-11.652344
                            0l-117.800781 84.445313v-364.527344h247.25zm0 0"/>
                    </svg>
                    <DropdownButton
                        id={`dropdown-button-drop-saved`}
                        title={'Сохраненное'}
                        className={`${classes['dropdown-drop-saved']}`}
                        onToggle = {(e,event)=> {
                            toggleFunc(4, e)
                        }}
                    >
                        <div className='d-flex align-items-center pb-3'>
                            <Save />
                            <h2 className='mb-0 font-weight-bold'>{t('header.dropdown-saved.title')}</h2>
                        </div>
                        <div className='d-flex'>
                            <div className='col-lg-3 d-flex flex-column justify-content-center pr-0'>
                                <p>{t('header.dropdown-saved.title-2')}</p>
                                <Link href='/'>
                                    <a>{t('header.dropdown-saved.link')}</a>
                                </Link>
                            </div>
                            <div className='col-lg-9'>
                                <p className='mt-3 font-weight-bold'>{t('header.dropdown-recently.text')}</p>
                                <CarouselProductsBuy products={products} count={2}/>
                            </div>
                        </div>
                    </DropdownButton>
                </div>


            </Nav>
        </Navbar>
    )
}