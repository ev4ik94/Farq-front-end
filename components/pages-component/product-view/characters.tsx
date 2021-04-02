import {useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'


/*----Bootstrap-----*/
import {Container} from 'react-bootstrap'

/*---Icons----*/
import {ChevronDown} from "react-bootstrap-icons"


/*----Styles----*/
import classes from '../../../styles/pages-components/product/acardion.module.sass'

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

export function Characters({characters}:{characters:ICharacters[]}){
    const [charactersArr, setCharacters] = useState([])
    const charArr = []
    const {t} = useTranslation()


    useEffect(()=>{
        setCharacters(characters)
    }, [characters])


    return(
        <div className={`${classes['wrap-characters-component']} ${classes['drop-down-items']} pl-0`}>
                <ul className={`pl-0`}>
                    {
                        charactersArr.map((item,index)=>{
                            return(
                                <div className={'d-flex'} key={index}>
                                    <div className={`col-lg-3`}>
                                        <p>{item.name}</p>
                                    </div>
                                    <div className={`col-lg-9`}>
                                    {
                                        item.attributes.map((child, index)=>{

                                            return(
                                                <div key={index} className="d-flex">

                                                    <div className="col-lg-6 col-md-6 d-flex flex-column justify-content-center">
                                                        <p className="text-left mb-0 font-weight-bold" dangerouslySetInnerHTML={{__html:child.group_name}} />
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <p className="text-left mb-0" dangerouslySetInnerHTML={{__html:child.attribute_name}} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    </div>

                                </div>
                            )
                        })
                    }
                </ul>
        </div>
    )
}