import Skeleton from "react-loading-skeleton"


/*----Bootstrap---*/
import {Container} from 'react-bootstrap'

export function HomePreloader(){
    return(
        <Container fluid>
                <div className='d-flex pt-5' style={{height: '600px'}}>
                    <div className='col-lg-6 pl-0'>
                        <Skeleton width={'100%'} height={'100%'}/>
                    </div>
                    <div className='col-lg-6 pr-0'>
                        <Skeleton width={'100%'} height={'50%'}/>
                        <Skeleton width={'100%'} height={'50%'}/>
                    </div>
                </div>
            <div className='pt-3'>
                <Skeleton width={'100%'} height={'200px'}/>
            </div>
            <Container>
                <div className='pt-3'>
                    <Skeleton count={2} height={'20px'}/>
                    <div className='d-flex flex-wrap pt-3'>
                        <div className='col-lg-3 pl-0'>
                            <Skeleton height={'250px'}/>
                        </div>
                        <div className='col-lg-3'>
                            <Skeleton height={'250px'}/>
                        </div>
                        <div className='col-lg-3'>
                            <Skeleton height={'250px'}/>
                        </div>
                        <div className='col-lg-3 pr-0'>
                            <Skeleton height={'250px'}/>
                        </div>
                    </div>
                </div>

                <div className='pt-3'>
                    <Skeleton height={'20px'}/>

                    <div className='pt-3 d-flex flex-wrap'>
                        <div className='col-lg-4'>
                            <Skeleton height={'370px'}/>
                        </div>
                        <div className='col-lg-4'>
                            <Skeleton height={'370px'}/>
                        </div>
                        <div className='col-lg-4'>
                            <Skeleton height={'370px'}/>
                        </div>
                        <div className='col-lg-4'>
                            <Skeleton height={'370px'}/>
                        </div>
                        <div className='col-lg-4'>
                            <Skeleton height={'370px'}/>
                        </div>
                        <div className='col-lg-4'>
                            <Skeleton height={'370px'}/>
                        </div>
                    </div>
                </div>
            </Container>
            <div className='pt-3 pb-3'>
                <Skeleton height={'200px'}/>
            </div>
        </Container>
    )
}