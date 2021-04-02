import {useState, useEffect} from 'react'
import {useTranslation} from "react-i18next"

/*----Styles----*/
import classes from '../../../styles/pages-components/compare/compare-characters-table.module.sass'

/*---Icons---*/
import {Check} from 'react-bootstrap-icons'


/*---Interfaces----*/

interface IPackages{
    name: string,
    package_id: number,
    attributes: IAttributes[]
}

interface IAttributes{
    attribute_names: {},
    caption: string|null,
    group_name: string,
    is_same: boolean
}


export function CompareCharactersTable({packages}:{packages:IPackages[]}){
    const {t} = useTranslation()
    const [showDiferent, setShowDiferent] = useState(false)

   console.log(packages)
    return(
        <div>
            <div className={`${classes['title-characters-table']} d-flex align-items-center`}>
                <h3 className='mb-0'>{t('compare-page.characters-table-title')}</h3>
                <div className='d-flex align-items-center'>
                    <div className={`${classes['check-box']}`} onClick={()=>setShowDiferent(!showDiferent)}>
                        {showDiferent?<Check />:''}
                    </div>
                    <p className='mb-0'>{t('compare-page.characters-table-check-box')}</p>
                </div>
            </div>

            <div className={`${classes['attributes-table-groups']}`}>
                {
                    packages.map(item=>{

                        return(
                            <div key={item.package_id}>
                                <p className='mb-0'>{item.name}</p>
                                <div>
                                    {
                                        item.attributes.map((attribute, index)=>{
                                            let attrNames = []

                                            for(let value in attribute.attribute_names){
                                                attrNames.push({
                                                    id: value,
                                                    name: attribute.attribute_names[value]
                                                })
                                            }
                                            for(let i=0; i<4; i++){
                                                if(!attrNames[i]){
                                                    attrNames.push({})
                                                }
                                            }

                                            const showDifferentValues = !attribute.is_same?classes['light-diferent']:''
                                            return(
                                                <div key={index} className={`${classes['item-attribute-group']} `}>
                                                    <p>{attribute.group_name}</p>
                                                    <div className='d-flex'>
                                                        {
                                                            attrNames.map((attr, index)=>{
                                                                return(
                                                                    <div key={index} className={`${showDiferent?showDifferentValues:''} col-lg-3`}>
                                                                        {
                                                                            attr.name?<p className='mb-0 text-center'>{attr.name}</p>:''
                                                                        }
                                                                    </div>
                                                                )
                                                            })
                                                        }
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
            </div>

        </div>
    )
}