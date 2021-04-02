import Link from 'next/link'
import React, {useEffect, useState, useRef} from 'react'


/*---Components-bootstrap---*/
import {DropdownButton, Navbar, Form, Button, Nav, FormControl} from 'react-bootstrap'

/*--Components---*/
import {BottomNavbar} from "./header/Bottom-Navbar"


/*----Icons----*/
import {Search, Globe, GeoAlt, Cart, ChevronRight} from 'react-bootstrap-icons'

/*---Style---*/
import classes from '../../styles/main-components/header.module.sass'


/*----Hooks----*/
import {useAuth} from "../../hooks/authentication.hook"



/*----Interfaces---*/

interface IMenu {
    id: number,
    type: string,
    name:string,
    slug: string,
    recursive_children:IChildren[]
}


interface IChildren{
    id: number,
    type: string,
    name:string,
    slug: string,
    recursive_children:IChildren[]
}


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

interface IBrands{
    id: number,
    name: string,
    slug: string
}

export function Header({
                           menu,
                           cart,
                           setDropDown,
                           dropDownState,
                           brands,
                           recently,
                           popular
}:
                           {
                               menu:IMenu[],
                               cart:number,
                               setDropDown:(value:any)=>void,
                               dropDownState:boolean,
                               brands: IBrands[],
                               recently: IProducts[],
                               popular: IProducts[]
                           }){

    const [showSubMenu, SetShowSubMenu] = useState(false)
    const [subChildren, setSubChildren] = useState([])
    const [subTitleId, setSubTitleId] = useState(0)
    const [subTitleName, setSubTitleName] = useState('')
    const [newObjCategories, setCategories] = useState([])
    const [currentChild, setCurrentChild] = useState([])
    const [titleCurrentCat, setTitleCurrentCat] = useState('')
    const [userData, setUserData] = useState<IUser | null>(null)
    const [products, setProducts] = useState([])


    const {checkAuth, getUserData, logout} = useAuth()





    const subMenu = useRef(null)
    const collapse = useRef(null)

    useEffect(()=>{
        if(typeof window !== 'undefined'){
            if(checkAuth()){
                setUserData(getUserData())
            }

        }
    }, [])



    useEffect(()=>{

        let newCat = [
            {
                id: 0,
                type: 'menu',
                name:'Продукты',
                slug: '',
                children: menu!==null?menu:[]
            },
            {
                id: 1,
                type: 'menu',
                name:'Бренды',
                slug: '',
                children: brands!==null?brands:[]
            }

        ]

        setCurrentChild(menu!==null&&menu.length?menu[0].recursive_children:[])
        setCategories(newCat)
        setTitleCurrentCat(menu!==null&&menu.length?menu[0].name:'')
    }, [menu])



    const eventClickMobileMenu = (id, name)=>{

        const windowWidth = window.innerWidth

        setSubTitleName(name)
        setSubTitleId(id)

        if(windowWidth<=992){

            const children = findChild(newObjCategories, Number(id))

            if(children){
                if(children.length){
                    SetShowSubMenu(true)
                    setSubChildren(children)
                    setTimeout(()=>{
                        collapse.current.style.height = subMenu.current.offsetHeight + 85 + 'px'
                    }, 10)

                }
            }

        }


    }

    const findChild = (arr, id)=>{
        for(let i=0; i<arr.length; i++){
            if(arr[i] && arr[i].id===id){
                return arr[i].children
            }
            for(let k=0; k<arr[i].children.length; k++){
                if(arr[i].children[k] && arr[i].children[k].id===id){
                    return arr[i].children[k].children
                }
                if(arr[i].children[k].children.length){

                    for(let l=0; l<arr[i].children[k].children.length; l++){
                        if(arr[i].children[k].children[l] && arr[i].children[k].children[l].id===id){
                            return arr[i].children[k].children[l].children
                        }
                    }
                }
            }
        }

        return false

    }

    const hoverClassRemoveAdd = (e)=>{
        let parentWrap = e.currentTarget.parentElement
        const links = parentWrap && parentWrap!==null ? Array.from(parentWrap.querySelectorAll('.title-link-menu')):[]

        links.forEach(item=>{
            let elem = item as HTMLElement
            if(elem.classList.contains(classes['hover-active'])){
                elem.classList.remove(classes['hover-active'])
            }
        })

        e.currentTarget.classList.add(classes['hover-active'])
    }


    const renderMenu = ()=>{

        return newObjCategories.map((item, index)=>{
            return(
                <DropdownButton
                    key={index}
                    id={`dropdown-button-drop-${index}-e`}
                    title={item.name}
                    className={`${classes['dropdown-link-title']}`}
                    data-name={item.name}
                    data-id={item.id}
                    onToggle={(e)=>{
                        setDropDown(e)

                        if(e){

                            setCurrentChild(item.children.length?item.children[0].recursive_children: [])
                            setTitleCurrentCat(item.children.length?item.children[0].name: '')


                        }
                    }}
                    onClick={()=>{
                        eventClickMobileMenu(item.id, item.name)
                    }}
                >

                    <div className={`d-flex p-0`}>
                        <div className={`col-lg-5 pl-0 pr-0`}>
                            {
                                item.children.map((item, index)=>(
                                    <p onMouseOver={(e)=>{
                                        hoverClassRemoveAdd(e)
                                        setCurrentChild(item.recursive_children?item.recursive_children:[])
                                        setTitleCurrentCat(item.name)
                                    }} key={item.slug} className={`mb-0 title-link-menu ${index===0?classes['hover-active']:''}`}
                                    >
                                        <Link href={'/'}>
                                            <a className='position-relative'>{item.name} <ChevronRight /></a>
                                        </Link>
                                    </p>
                                ))
                            }
                        </div>
                        <div className={`col-lg-7`}>
                            <Link href={`/categories/${currentChild && currentChild.length?currentChild[0].slug:0}`}>
                                <a>{titleCurrentCat}</a>
                            </Link>

                            <div className={`d-flex flex-wrap mt-3`}>
                                {
                                    f(currentChild)
                                }
                            </div>
                        </div>
                    </div>

                </DropdownButton>
            )
        })
    }

    const f = (children)=>{


        return(
            <>

                {
                    (children || []).map((item, index, arr)=>{
                        if(item.recursive_children.length){
                            return(
                                <div className='col-lg-6 pt-0 pb-0 pl-1 pr-1 mb-3 align-self-baseline' key={item.slug}>
                                    <>
                                        <Link href={`/categories/${item.slug}`}>
                                            <a className={`font-weight-bold ${classes['title-link']}`}>{item.name}</a>
                                        </Link>
                                        <div>{f(item.recursive_children)}</div></>
                                </div>
                            )
                        }else{

                            if((index+1) < 6){

                                return(
                                    <p key={item.slug} className='mb-0'>
                                        <Link href={`/products/${item.slug}/${item.slug}?category_id=${item.slug}`}>
                                            <a>{item.name}</a>
                                        </Link>
                                    </p>
                                )
                            }else if((index+1) ===6){
                                return(
                                    <p key={item.slug} className={`${classes['link-more']} mb-0`}>
                                        <Link href={`/categories/${item.slug}`}>
                                            <a>
                                                <span>See more</span>
                                                <ChevronRight />
                                            </a>
                                        </Link>
                                    </p>
                                )
                            }
                        }
                    })
                }
            </>
        )
    }

    const renderChild = (children)=>{
        return (children || []).map((item)=>{
            if(item.children.length){
                return(
                    <DropdownButton
                        drop='right'
                        key={item.id}
                        id={`dropdown-button-drop--${item.id}`}
                        title={item.name}
                        data-name={item.name}
                        data-id={item.id}
                        className={classes['drop-down-sub']}
                        onClick={()=>eventClickMobileMenu(item.id, item.name)}
                    >
                        {renderChild(item.children)}
                        {
                            item.children.length?(<Link href={`/categories/${item.id}`}>
                                <a>Все категории</a>
                            </Link>):''
                        }
                    </DropdownButton>
                )
            }else{
                return(
                    <Link href={`/products/${item.id}?category_id=${item.id}`} key={item.id}>
                        <a className={classes['nav-link']} key={item.id}>{item.name}</a>
                    </Link>
                )
            }

        })
    }


    return (
        <div className={`${classes['header-wrap']}`}>
            <Navbar expand="lg" className={`${classes['nav-bar']} overflow-lg-auto overflow-hidden`} variant='dark'>
                <Link href={'/'}>
                    <a>
                        <Navbar.Brand>
                            <div className={classes['icon-brand']}>
                                <img src="/logo-farq.svg" alt=""/>
                            </div>
                        </Navbar.Brand>
                    </a>
                </Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" className={classes['toggle-button']}/>
                <Form inline className={`col-7 ${classes['form-search-nav']}`}>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2 w-100" />
                    <Button className={`position-absolute`}><Search /></Button>
                </Form>
                <Link href={'/cart'}>
                        <a className={`d-lg-none ${classes['md-link']}`} >
                            <Cart />
                            <span>{cart}</span>
                        </a>
                </Link>
                <div className='w-100 d-none'>
                    <Navbar.Brand href="#home">
                        <div className={classes['icon-brand']}>
                            <img src="/vercel.svg" alt=""/>
                        </div>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" className={classes['toggle-button']}/>
                    <Form inline className={`col-7 ${classes['form-search-nav']}`}>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2 w-100" />
                        <Button className={`position-absolute`}><Search /></Button>
                    </Form>
                    <Link href={'/cart'}>
                        <a className={`nav-link d-lg-none ${classes['md-link']}`}>
                            <Cart />
                            <span>{cart}</span>
                        </a>
                    </Link>
                </div>
                <Navbar.Collapse id="basic-navbar-nav" className='w-100' ref={collapse}>

                    <Nav className={`ml-auto ${classes['top-nav-link']} justify-content-end`}>
                        <Link href={'/'}>
                            <a className={`nav-link`}>
                                <GeoAlt />
                                <span>Ташкент</span>
                            </a>
                        </Link>
                        <Link href={'/'}>
                            <a className={`nav-link`}>
                                <Globe />
                                <span>Ru</span>
                            </a>
                        </Link>
                        <Link href={'/cart'}>
                            <a className={`d-lg-block d-none nav-link`}>
                                <Cart />
                                <span>{cart}</span>
                            </a>
                        </Link>
                    </Nav>
                    <div className={`d-lg-none ${classes['collapse-navbar']} position-relative`}>
                        <BottomNavbar
                            renderMenu={renderMenu}
                            setDropDown={setDropDown}
                            userData = {userData}
                            logout={logout}
                            recently={recently}
                            popular={popular}
                        />
                        <div className={`${classes['sub-menu-collapse']} ${showSubMenu?`${classes['show']}`:`${classes['hide']}`} position-absolute`} ref={subMenu}>
                            <div className={`text-center`}>
                                <button
                                    data-id={subTitleId}

                                    onClick={(e)=>{
                                        let hasChild = false

                                        for(let k=0; k<menu.length; k++){
                                            for(let i=0; i<menu[k].recursive_children.length; i++){
                                                if(menu[k].recursive_children[i].id===Number(subTitleId)){

                                                    setSubTitleId(menu[k].id)
                                                    setSubTitleName(menu[k].name['ru'])
                                                    setSubChildren(menu[k].recursive_children)
                                                    hasChild = true
                                                    break
                                                }else{
                                                    for(let j=0; j<menu[k].recursive_children[i].recursive_children.length; j++){
                                                        if(menu[k].recursive_children[i].recursive_children[j].id===Number(subTitleId)){
                                                            setSubTitleId(menu[k].recursive_children[i].id)
                                                            setSubTitleName(menu[k].recursive_children[i].name['ru'])
                                                            setSubChildren(menu[k].recursive_children[i].recursive_children)
                                                            hasChild = true
                                                            break
                                                        }
                                                    }
                                                }
                                            }
                                        }



                                        if(!hasChild) {
                                            SetShowSubMenu(false)
                                            collapse.current.style = ''
                                        }else{
                                            setTimeout(()=>{
                                                collapse.current.style.height = subMenu.current.offsetHeight + 85 + 'px'
                                            }, 10)
                                        }

                                    }}
                                >
                                    {subTitleName}</button>
                            </div>
                            <div>
                                {renderChild(subChildren)}
                            </div>
                        </div>
                    </div>


                </Navbar.Collapse>
            </Navbar>
            <div className='d-lg-block d-none'>
                <BottomNavbar
                    renderMenu={renderMenu}
                    setDropDown={setDropDown}
                    userData = {userData}
                    logout={logout}
                    recently={recently}
                    popular={popular}
                />
            </div>
        </div>
    )
}

