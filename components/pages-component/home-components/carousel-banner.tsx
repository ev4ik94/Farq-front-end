import Slider from "react-slick"
import {useRef, useState, useEffect} from 'react'
import {Suspense} from 'react'


/*----Styles---*/
import classes from '../../../styles/pages-components/home/carousel-banner.module.sass'


/*---Bootstrap-icons----*/
import {PauseCircle, PlayCircle, RecordFill} from "react-bootstrap-icons"

/*----Interface---*/
interface IBanner{
    id: number,
    src: string
}

export default function CarouselBanner({banner}:{banner:IBanner[]}){

    const g = useRef(null)
    const [stateBtnPause, setState] = useState(true)


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows: false

    }




    const nextSlide = ()=>{
        g.current.slickNext()
    }
    const prevSlide = ()=>{
        g.current.slickPrev()
    }
    const pauseSlide = ()=>{
        g.current.slickPause()
    }
    const playSlide = ()=>{
        g.current.slickPlay()
    }




    return(
        <div className={`${classes['carousel-wrap']} col-6 pl-0`} id='carousel-home'>
            <div className={`position-absolute ${classes['carousel-controls']}`}>
                <div>
                    <button onClick={prevSlide}>
                        <RecordFill />
                    </button>
                    <button onClick={()=>{
                        if(stateBtnPause){
                            pauseSlide()
                            setState(false)
                        }else{
                            playSlide()
                            setState(true)
                        }
                    }}>{stateBtnPause?<PauseCircle />:<PlayCircle />}</button>
                    <button onClick={nextSlide}>
                        <RecordFill />
                    </button>
                </div>
            </div>
        <Slider {...settings} ref={g}>
            {
                banner.map(item=>{
                    return(
                        <div key={item.id}>
                            <img src={item.src} alt=""/>
                        </div>
                    )
                })
            }

        </Slider>
        </div>
    )
}