import Skeleton from "react-loading-skeleton"


/*----Bootstrap---*/
import {Container} from 'react-bootstrap'

export function ProductList(){
    return(
        <Container fluid>
           <div className='pt-5'>
               <Skeleton />
               <Skeleton width='60%'/>
           </div>
            <div className='d-flex pt-3'>
                <div className='col-lg-3'>
                    <Skeleton width='100%' height='90vh'/>
                </div>
                <div className='col-lg-9'>
                    <Skeleton count={3} width='100%' height='250px'/>
                </div>
            </div>
        </Container>
    )
}