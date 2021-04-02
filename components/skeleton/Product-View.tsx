import Skeleton from "react-loading-skeleton"


/*----Bootstrap---*/
import {Container} from 'react-bootstrap'


export function ProductView() {

    return(
        <Container>
            <div className='pt-5'>
                <Skeleton />
                <Skeleton width='60%'/>
                <Skeleton  width='50%'/>
            </div>
            <div className='d-flex pt-3' style={{minHeight: '500px'}}>
                <div className='col-lg-7 pl-0'>
                    <Skeleton width='100%' height={'100%'}/>
                </div>
                <div className='col-lg-5 d-flex flex-column'>
                    <Skeleton width='60%'/>
                    <Skeleton width='40%' />
                    <div className='row mt-3'>
                        <div className='col-4'>
                            <Skeleton height={'50px'}/>
                        </div>
                        <div className='col-4'>
                            <Skeleton height={'50px'}/>
                        </div>
                        <div className='col-4'>
                            <Skeleton height={'50px'}/>
                        </div>
                    </div>
                    <Skeleton height={'50px'} className='mt-3'/>
                    <div className='row pt-3'>
                        <div className='col-6'>
                            <Skeleton height={'50px'}/>
                        </div>
                        <div className='col-6'>
                            <Skeleton height={'50px'}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'mt-3'}>
                <Skeleton height={'100px'}/>
                <Skeleton height={'300px'} className='mt-3'/>
            </div>
        </Container>
    )
}