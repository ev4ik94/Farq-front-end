import {useEffect, useState} from "react"


/*---styles---*/
import classes from '../../../../styles/pages-components/identity/alert-messages.module.sass'

/*----Interfaces----*/

interface IErrors{
    field: string,
    message: string
}

/*---Icons----*/
import {X} from 'react-bootstrap-icons'

export function AlertMessage({isSuccess, errors, alertSuccess}:{isSuccess:boolean, errors:IErrors[], alertSuccess:string}){
    const [showAlerts, setShowAlerts] = useState(false)

    useEffect(()=>{

        setShowAlerts(isSuccess || errors.length?true: false)
    }, [isSuccess, errors])
    if(!isSuccess && !errors.length){
        return(<></>)
    }

    return(
        <div className={`${classes['messages__alert']} ${showAlerts?classes['show-alerts']:''}`}>
            <button onClick={()=>setShowAlerts(false)}><X /></button>
            {isSuccess? <div className={`${classes['message__success_alert']}`}>
                <p className='mb-0'>{alertSuccess}</p>
            </div>: <>
                {
                    errors.map((item, index)=>{
                        return(
                            <div key={index} className={`${classes['message__error_alert']}`}>
                                <p className='mb-0'>{item.field}: {item.message}</p>
                            </div>
                        )
                    })
                }
            </>}
        </div>
    )
}