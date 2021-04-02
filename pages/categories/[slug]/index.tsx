import {useRouter} from "next/router"
import {useEffect, useState} from 'react'
import Link from 'next/link'


/*---Components---*/
import MainComponent from "../../../components/Main-Component"

/*---Bootstrap---*/
import {Container} from 'react-bootstrap'

/*----Components---*/
import {BannerCategoriesList} from '../../../components/pages-component/categories/banner-categories-list'

/*----Redux----*/
import {connect} from 'react-redux'
import {getCategories} from "../../../redux/actions/actionCategories"


/*----Styles----*/
import classes from '../../../styles/pages-components/categories/categories-list.module.sass'



/*---Interfaces----*/

interface ICategories {
    id: number,
    recursive_children: ICategories[],
    description: string,
    icon_url: {},
    image_urls: IImages,
    name: string,
    parent_id: number
}

interface IImages {
    md: string,
    org: string,
    sm: string,
    xs: string
}

function CategoriesPage({categories}: {categories:ICategories[]}){
    const router = useRouter()
    const {slug} = router.query
    const [categoriesArr, setCategories] = useState<ICategories[]>([])
    const [title, setTitle] = useState('')



    useEffect(()=>{
       nestedCat(categories)
        console.log(categories)
    }, [categories])

    const nestedCat = (arr)=>{
        if(arr && arr!==null){
            for(let i=0; i<arr.length; i++){
                if(arr[i].id===Number(slug)){
                    setTitle(arr[i].name)
                    setCategories(arr[i].recursive_children?arr[i].recursive_children:[])
                }
                nestedCat(arr[i].recursive_children)
            }
        }
    }


    return(
        <MainComponent>

            <Container className={`pt-3`}>
                <h1 className='font-weight-bold'>{title}</h1>
            </Container>
            <BannerCategoriesList />
            <Container>
                <div className={`d-flex ${classes['wrap-categories-list']} flex-wrap`}>
                    {
                        (categoriesArr || []).map((item,index)=>{

                            return(
                                <div key={item.id} className={`col-lg-4`}>
                                    <div className={`${classes['picture-category']}`}>
                                        <img src={item.image_urls?item.image_urls.md:''} alt={item.name}/>
                                    </div>
                                    <div className={`mt-3`}>
                                        <Link href={`${item.recursive_children.length? `/categories/${item.id}`:`/products/${slug}/${item.id}?category_id=${item.id}`}`}>
                                            <a>{item.name}</a>
                                        </Link>
                                        <p>{item.description}</p>
                                    </div>
                                    <div>
                                        {
                                            item.recursive_children.map(child=>{
                                                return(
                                                    <p key={child.id}>
                                                        <Link href={`/products/${slug}/${item.id}/${child.id}?category_id=${child.id}`}>
                                                            <a>{child.name}</a>
                                                        </Link>
                                                    </p>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Container>
        </MainComponent>
    )
}


const mapStateToProps = state=>({
    categories: state.categories
})

const mapDispatchToPRops = {
    getCategories

}

export default connect (mapStateToProps, mapDispatchToPRops)(CategoriesPage)