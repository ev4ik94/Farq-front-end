import {useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'


/*----Bootstrap-----*/
import {Container} from 'react-bootstrap'

/*---Icons----*/
import {ChevronDown} from "react-bootstrap-icons"


/*----Styles----*/
import classes from '../../../styles/pages-components/product/acardion.module.sass'

/*----Components----*/
import {Characters} from './characters'
import {Review} from "./review";


/*-----Interfaces----*/

interface ICharacters{
    package_id: number,
    name: string,
    attributes: IAttributes[]
}

interface IAttributes{
    attribute_id: number,
    attribute_name: string,
    group_id: number,
    group_name: string,
    sku_id: number
}

export function Accordion({characters}:{characters:ICharacters[]}){

    const [charactersArr, setCharacters] = useState([])
    const {t} = useTranslation()


    useEffect(()=>{
        setCharacters(characters)
    }, [characters])


    return(
        <div className={`${classes['wrap-characters-component']} mb-5 pt-3`}>
                <ul className={`pl-0`}>
                    <li className={`${classes['container-wrap-characters']} pl-0`}
                        onClick={(e)=>{
                            let elem = e.currentTarget
                            if(elem && elem!==null){
                                elem.classList.toggle(`${classes['active']}`)

                                const elemDropDown = elem.querySelectorAll(`.${classes['drop-down-items']}`).length?
                                    elem.querySelectorAll(`.${classes['drop-down-items']}`)[0] as HTMLElement : null

                                const childElement = elemDropDown.firstChild!==null?elemDropDown.firstChild as HTMLElement:null

                                const height = elemDropDown && elemDropDown!==null && childElement!==null
                                    ?elemDropDown.offsetHeight + childElement.offsetHeight + 10: 0

                                if(elem.classList.contains(`${classes['active']}`)){
                                    elemDropDown.style.height = `${height}px`
                                }else{
                                    elemDropDown.style.height = ``
                                }

                            }
                        }}>
                        <div className={`${classes['title-characters']} d-flex justify-content-between`}>
                            <div>
                                <p className="mb-0">{t('product-view-link.specification')}</p>
                            </div>
                            <div className={`${classes['close-btn']}`}>
                                <ChevronDown />
                            </div>
                        </div>
                        <Characters characters={characters}/>
                    </li>
                    <li className={`${classes['container-wrap-characters']} pt-3 pb-3 pl-0`}
                        onClick={(e)=>{
                            let elem = e.currentTarget
                            if(elem && elem!==null){
                                elem.classList.toggle(`${classes['active']}`)

                                const elemDropDown = elem.querySelectorAll(`.${classes['drop-down-items']}`).length?
                                    elem.querySelectorAll(`.${classes['drop-down-items']}`)[0] as HTMLElement : null

                                const childElement = elemDropDown.firstChild!==null?elemDropDown.firstChild as HTMLElement:null

                                const height = elemDropDown && elemDropDown!==null && childElement!==null
                                    ?elemDropDown.offsetHeight + childElement.offsetHeight + 10: 0

                                if(elem.classList.contains(`${classes['active']}`)){
                                    elemDropDown.style.height = `${height}px`
                                }else{
                                    elemDropDown.style.height = ``
                                }

                            }
                        }}>
                        <div className={`${classes['title-characters']} d-flex justify-content-between`}>
                            <div>
                                <p className="mb-0">{t('product-view-link.review')}</p>
                            </div>
                            <div className={`${classes['close-btn']}`}>
                                <ChevronDown />
                            </div>
                        </div>
                        <Review />
                    </li>

                </ul>
        </div>
    )

}