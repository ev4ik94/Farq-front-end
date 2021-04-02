import {useTranslation} from "react-i18next"
import {useEffect, useState} from 'react'
import Link from 'next/link'
import {useRouter} from "next/router"
import {connect} from 'react-redux'


/*---Components---*/
import MainComponent from "../../components/Main-Component"
import {CompareListProducts} from "../../components/pages-component/compare/compare-list-products"
import {ModalViewImage} from "../../components/pages-component/product-view/modal-view-image"
import {CompareCharactersTable} from "../../components/pages-component/compare/compare-characters-table"
import {CompareReviewRating} from "../../components/pages-component/compare/compare-review-rating"
import {SubscribeForm} from "../../components/main-components/subscribe-form"

/*----Bootstrap----*/
import {Container} from 'react-bootstrap'


/*---Icons---*/
import {ChevronLeft} from "react-bootstrap-icons"

/*---Styles---*/
import classes from '../../styles/pages-components/compare/compare-list-products.module.sass'
import {setCompare} from "../../redux/actions/actioncompare"

/*----Hooks-----*/
import {AxiosApi} from "../../hooks/axios.hook"


/*----Interfaces---*/
interface IServerData{
    compares: IComparesBlock[],
    error: {
        state: boolean,
        status: number
    }
}

interface IComparesBlock{
    id: number,
    brand: {},
    category?: {},
    code: string,
    images: {
        image_srcset: string,
        original_image: string,
    },
    name: string,
    price: {
        old_price: number|null,
        price: number
    },
    slug: string,
    warehouse: {
        name: string,
        slug: string
    }
}



function Compare({compare, setCompare}: {compare:IComparesBlock[], setCompare:(compare: IComparesBlock[])=>void}){

    const router = useRouter()
    const {t} = useTranslation()
    const [compares, setCompares] = useState<IComparesBlock[]>([])
    const [recently, setRecently] = useState([])
    const [recentlyMount, setMountRecently] = useState(true)
    const [packages, setPackages] = useState([])
    const [show, setShow] = useState(false)

    const {request} = AxiosApi()


    const handleClose = ()=>{
        setShow(false)
    }

    useEffect(()=>{
        if(recentlyMount){
            getRecently()
        }
    }, [recentlyMount])

    const getRecently = async()=>{
        await request(process.env.COMPARES_SUGGESTIONS['ru'])
            .then(result=>{
                console.log('Recently result',result)
                setMountRecently(false)
            })
    }

    // const imagesFilter = ()=>{
    //     const arrayImages = compares!==null&& compares.length? compares.filter(item=>item.image_urls):[]
    //     return arrayImages.length?arrayImages[0].image_urls:[]
    // }



    return(
        <MainComponent>
            <Container fluid>
                <ModalViewImage images={[]} show={show} handleClose={handleClose}/>
                <button onClick={()=>router.back()} className={classes['button-back']}>
                    <ChevronLeft />
                    {t('compare-page.button-back')}
                </button>
                <h1 className='font-weight-bold'>{t('compare-page.title')}</h1>
                <CompareListProducts compares={compare} openModal = {setShow} setCompare={setCompare}/>
                <CompareCharactersTable packages={packages}/>
                <CompareReviewRating />
                <SubscribeForm />
            </Container>

        </MainComponent>
    )
}


const mapStateToProps = state=>({
    compare: state.compare,
})

const mapDispatchToPRops = {
    setCompare

}

export default connect (mapStateToProps, mapDispatchToPRops)(Compare)