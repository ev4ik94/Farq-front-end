import {useState, useEffect, useRef} from 'react'
import InnerImageZoom from 'react-inner-image-zoom'

/*---styles----*/
import classes from '../../../styles/pages-components/product/modal-view-image.module.sass'

/*---Bootstrap---*/
import {Modal} from 'react-bootstrap'

/*---Icons----*/
import {Play} from '../../icons/Play'
import {Pause} from '../../icons/Pause'

/*----Components---*/
import {LazyLoadImage} from "../../preloader/Lazy-Load-Image"

const video = [
    {
        poster: 'https://i.mover.uz/EU7DwHnm_h2.jpg',
        video_url: 'https://v.mover.uz/EU7DwHnm_m.mp4'
    },
    {
        poster: '/images/photo_2021-03-01_10-48-00.jpg',
        video_url: 'https://www.youtube.com/watch?v=_FQTt8cHefM'
    }
]


interface IImage{
    image_srcset: string,
    original_image: string,
}

export function ModalViewImage({images, show, handleClose}:{images:IImage[], show:boolean, handleClose:(value:any)=>void}){

    const [currentImage, setCurrent] = useState('')

    const [controls, setControls] = useState({
        play: true,
        pause: false,
        sound: true
    })

    const [currentVideo, setCurrentVideo] = useState({
        poster: '',
        video_url: ''
    })




    const mediaPlayer = useRef(null)

    useEffect(()=>{
        if(images.length){
            setCurrent(images[0].original_image)
        }
    }, [images])

    useEffect(()=>{
        if(video.length){
            setCurrentVideo({...currentVideo, poster: video[0].poster, video_url: video[0].video_url})
        }
    }, [video])

    const toggleButtons = (e)=>{
        const button = e.currentTarget
        const id = e.currentTarget.getAttribute('data-id')
        const elem = document.getElementById(id)
        const elementArr = Array.from(document.getElementsByClassName('button-toggle'))

        elementArr.forEach(item=>{
            if(item.classList.contains(classes['active'])){
                item.classList.remove(classes['active'])
                let idE = item.getAttribute('data-id')
                document.getElementById(idE).classList.remove('d-block')
                document.getElementById(idE).classList.add('d-none')
            }
        })

        button.classList.add(classes['active'])
        elem.classList.remove('d-none')
        elem.classList.add('d-block')

    }

    const setActive = (e)=>{
        const elem = e.currentTarget
        const elemArr = Array.from(document.getElementsByClassName('picture-button'))

        elemArr.forEach(item=>{
            if(item.classList.contains(`${classes['active']}`)){
                item.classList.remove(classes['active'])
            }
            console.log(elem)
            elem.classList.add(classes['active'])
        })
    }


    const PlayPlayer = ()=>{
        setControls({...controls, play: !controls.play, pause: !controls.pause})
        document.getElementsByTagName('video')[0].play()
    }

    const PausePlayer = ()=>{
        setControls({...controls, pause: !controls.pause, play: !controls.play,})
        document.getElementsByTagName('video')[0].pause()
    }

    const hoverVideo = (value)=>{
        const buttons = Array.from(document.getElementsByClassName(classes['button-pause-center']))
        if(value==='leave'){
            buttons.forEach(item=>{
                item.classList.add(classes['hide'])
                item.classList.remove(classes['show'])
            })
        }else{
            buttons.forEach(item=>{
                item.classList.add(classes['show'])
                item.classList.remove(classes['hide'])
            })
        }
    }



    return(
        <>
            <Modal show={show} onHide={handleClose} className={classes['modal-view-wrap']}>
                <Modal.Header closeButton className={'pb-0'}>
                    <div className={`${classes['toggle-buttons']}`}>
                        <button data-id='product-image' className={`${classes['active']} button-toggle mb-0`} onClick={toggleButtons}>
                            Product Images
                        </button>
                        <button data-id='video' className={'button-toggle mb-0'} onClick={toggleButtons}>
                            Video
                        </button>
                        <button data-id='image-review' className={'button-toggle mb-0'} onClick={toggleButtons}>
                            Customer Images
                        </button>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div className={`${classes['block-toggle']} d-block`} id={'product-image'}>
                       <div className={`d-flex`}>
                           <div className={`${classes['gallery-image']} col-lg-3`}>
                               {
                                    images.map((item,index)=>{
                                        return(
                                            <div key={index} className={'picture-button'} onClick={(e)=>{
                                                setActive(e)
                                                setCurrent(item.original_image)
                                            }}>
                                                <LazyLoadImage image={{
                                                    src: item.original_image,
                                                    srcSet: item.image_srcset,
                                                    alt: ''
                                                }}/>

                                            </div>
                                        )
                                    })
                               }
                           </div>
                           <div className={`col-lg-9`}>
                               <InnerImageZoom src={currentImage} zoomSrc={currentImage}/>
                           </div>
                       </div>
                    </div>
                    <div className={`${classes['block-toggle']} d-none`} id={'video'}>
                        <div className={'d-flex'}>
                            <div className={`${classes['gallery-video']} col-lg-4`}>
                                {
                                    video.map((item,index)=>{
                                        return(
                                            <div key={index} className={'picture-button d-flex'} onClick={(e)=>{
                                                setActive(e)
                                                setControls({...controls, pause: false, play: true,})
                                                setCurrentVideo({
                                                    ...currentVideo, poster: item.poster, video_url: item.video_url
                                                })
                                            }}>
                                                <div className={`${classes['item-video']} col-lg-7 position-relative`}>
                                                    <div className={`position-absolute`}>
                                                        <Play />
                                                    </div>
                                                    <img src={item.poster} alt="" />
                                                </div>
                                                <div className={`video-title col-lg-5 d-flex flex-column justify-content-center`}>
                                                    <p>Title title title</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className={`col-lg-8`}>
                                <div className={`position-relative`}>
                                    <Video picture={currentVideo.poster} video={currentVideo.video_url} hoverVideo={hoverVideo}/>
                                    <button
                                        className={`position-absolute ${controls.play?'d-block':'d-none'} ${classes['button-control-player']} ${classes['button-play-center']}`}
                                        onClick={PlayPlayer}
                                    >
                                         <Play />
                                    </button>
                                    <button
                                        className={`position-absolute ${controls.pause?'d-block':'d-none'} ${classes['button-control-player']} ${classes['button-pause-center']}`}
                                        onClick={PausePlayer}
                                    >
                                        <Pause />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${classes['block-toggle']} d-none`} id={'image-review'}>
                        <p>Customer Images</p>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}


function Video ({picture, video, hoverVideo}){
    return(
        <video controls
               poster = {picture}
               className={`w-100 ${classes['vide-player']}`}
               onMouseLeave={()=>hoverVideo('leave')}
               onMouseEnter={()=>hoverVideo('enter')}
               controlsList="nodownload noremoteplayback nodownload nopictureinpicture"
               disablePictureInPicture={true}
               src={video}
        />
    )
}