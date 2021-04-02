import {useState, useEffect} from 'react'
import Skeleton from "react-loading-skeleton"


/*----Interfaces----*/

interface IImage{
    src: string,
    srcSet: string,
    alt: string
}


export function LazyLoadImage({image}:{image:IImage}){

    const [loadingImage, setLoading] = useState(true)

    useEffect(()=>{
        if(loadingImage){
            IsLoading()
        }
    }, [loadingImage])

    const IsLoading = ()=>{
        let imgUp = document.createElement('img');
        imgUp.src = image.src
        imgUp.onload = function() {
            setLoading(false)
        }
    }

    return(
        <>
            <img  src={image.src} alt={image.alt} srcSet={image.srcSet} sizes={loadingImage?'1px':'100vw'} style={{objectFit: 'contain'}}/>
        </>
    )


}