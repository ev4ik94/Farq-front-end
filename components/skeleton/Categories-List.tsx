import Skeleton from "react-loading-skeleton"


/*----Bootstrap---*/
import {Container} from 'react-bootstrap'



export function CategoriesList(){

    return(
        <Container fluid>
            <div className='pt-5'>
                <Skeleton width='50%'/>
            </div>
            <Skeleton height='300px'/>
            <Container className='d-flex flex-wrap'>
                <div className='col-lg-4 mt-3'>
                    <Skeleton width='100%' height='370px'/>
                </div>
                <div className='col-lg-4 mt-3'>
                    <Skeleton width='100%' height='370px'/>
                </div>
                <div className='col-lg-4 mt-3'>
                    <Skeleton width='100%' height='370px'/>
                </div>
                <div className='col-lg-4 mt-3'>
                    <Skeleton width='100%' height='370px'/>
                </div>
                <div className='col-lg-4 mt-3'>
                    <Skeleton width='100%' height='370px'/>
                </div>
                <div className='col-lg-4 mt-3'>
                    <Skeleton width='100%' height='370px'/>
                </div>
            </Container>
        </Container>
    )
}