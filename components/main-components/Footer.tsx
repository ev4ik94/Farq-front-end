import Link from 'next/link'



/*---Bootstrap---*/
import {Container, Accordion, Card, Button} from 'react-bootstrap'

/*-----Components----*/
import {SubscribeForm} from "./subscribe-form"

/*----Styles---*/
import classes from '../../styles/main-components/footer.module.sass'


/*---Interface----*/

interface ICategories{
    id: number,
    type: string,
    name: string,
    slug: string,
    children: IChildren[]
}

interface IName {
    ru: string,
    en: string,
    uz: string
}

interface IChildren{
    id: number,
    type: string,
    name: string,
    slug: string,
    recursive_children?: IChildren[]
}


interface ICategoriesBot{
    id: number,
    type: string,
    name: IName,
    slug: string,
    children?: IChildren[]
}


export function Footer({categoriesTop, categoriesBot}:{categoriesTop:ICategories[], categoriesBot:ICategoriesBot[]}){

    const renderCategoriesTop = (arr)=>{
        return (arr || []).map((item, index)=>{

            if(item.recursive_children && item.recursive_children.length){
                return(
                    <li className={`${classes['title-list-cat']}`} key={index} onClick={(e)=>accordionToggle(e)}>
                        <Link href={'/'}>
                            <a onClick={(e)=>e.preventDefault()}><p className={'mb-0'}>{typeof item.name === "string" ? item.name : item.name['ru']}</p></a>
                        </Link>
                        <ul className={`${classes['child-links']}`}>{renderCategoriesTop(item.recursive_children)}</ul>
                    </li>
                )
            }else{
                <li key={index}><p className={'mb-0'}>{item.name}</p></li>
            }

        })
    }

    const accordionToggle = (e)=>{
        const screenWidth = window.innerWidth
        const childElem = e.currentTarget.querySelector(`.${classes['child-links']}`)

        const heightElem = childElem.offsetHeight
        console.log(heightElem)
        if(screenWidth<992){
            e.currentTarget.classList.toggle(classes['show'])
            if(e.currentTarget.classList.contains(`${classes['show']}`)){
                e.currentTarget.style.height = `${heightElem + 40}px`
            }else{
                e.currentTarget.style.height = ''
            }

        }
    }

    return (
        <Container fluid className={classes['footer-wrap']}>
            <div className='d-flex flex-wrap'>
                <div className={`col-lg-7`}>
                    <ul className={`d-flex ${classes['list-categories-footer']} 
                    justify-content-start accordion accordion-flush flex-lg-row flex-column`} id='accordionFlushExample'>
                        {renderCategoriesTop((categoriesTop!==null && categoriesTop?categoriesTop:[]))}
                    </ul>
                </div>
                <div className={`col-lg-5`}>
                    <SubscribeForm />
                </div>
            </div>
            <ul className={`d-flex ${classes['categories-list-bot']} mb-0`}>
                {
                    (categoriesBot!==null && categoriesBot?categoriesBot:[]).map((item, index)=>{

                        return(
                            <li key={index}>
                                <Link href={'/'}>
                                    <a>
                                        {typeof item.name === "string" ? item.name : item.name['ru']}
                                    </a>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </Container>
    )
}
