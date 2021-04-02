import Link from 'next/link'

/*---Icons---*/
import {Card} from '../../icons/Card'
import {AddressBook} from "../../icons/Address-book"
import {TimeClock} from '../../icons/time-oclock'
import {PersonCircle} from 'react-bootstrap-icons'

/*---Bootstrap---*/
import {Container} from "react-bootstrap"


/*---VirtDb----*/
import {link} from "../../../virtDb/arrLinksAccount"

/*---styles---*/
import classes from '../../../styles/pages-components/account/card-group.module.sass'

export function CardLinkGroup(){

    const HTMLIcons = (icon)=>{
        switch(icon){
            case 'TimeClock':
                return <TimeClock />
            case 'Card':
                return <Card />
            case 'AddressBook':
                return <AddressBook />
            case 'PersonCircle':
                return <PersonCircle />
            default:
                return ''
        }
    }
    return(
        <Container>
            <div className={`${classes['card-group-wrap']} d-flex flex-wrap justify-content-start mt-3 mb-3`}>
                {
                    link.map(item=>{
                        return(
                            <div className={`col-lg-4`} key={item.id}>
                                <Link href={`/account/${item.slug}`}>
                                    <a>
                                        <div>
                                            <div className={`${classes['title-card']}`}>
                                                {HTMLIcons(item.icon)}
                                                <span className='mb-0'>{item.name['ru']}</span>
                                            </div>
                                            <div className={`${classes['description-card']}`}>
                                                <p className='mb-0'>{item.description}</p>
                                            </div>
                                            <div className={`${classes['link-card']}`}>
                                                <span>{item.link_name}</span>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </Container>
    )
}