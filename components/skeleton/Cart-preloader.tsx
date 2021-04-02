import Skeleton from "react-loading-skeleton"


/*---Bootstrap----*/
import {Container} from 'react-bootstrap'

export function CartPreloader(){
    return(
        <Container fluid>
            <Skeleton className='mt-5' width='50%'/>
            <div className='row mt-3'>
                <div className='col-lg-8'>
                    <Skeleton height='500px'/>
                </div>
                <div className='col-lg-4'>
                    <Skeleton height='200px'/>
                </div>
            </div>
        </Container>
    )
}