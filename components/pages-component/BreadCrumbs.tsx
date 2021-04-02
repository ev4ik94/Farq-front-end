import {useRouter} from "next/router"
import Link from "next/link"

import classes from "../../styles/pages-components/breadCrumbs.module.sass"


/*----Interface---*/

interface ILinks{
    id: number,
    category_id?:number,
    name: string
}


export function BreadCrumbs({arr}:{arr:ILinks[]}){
    const router = useRouter()
    return(
        <div className={`${classes['bread-crumbs']}`}>
            <hr className='w-100'/>
            <div>
                <p className='mb-0'>
                    <Link href='/'>
                        <a>Farq</a>
                    </Link>
                </p>
                {
                    arr.map((slug, index)=>{

                        if(router.query.slug?router.query.slug.length === (index+1):false){
                            return(
                                <p key={index} className='mb-0'>{slug.name}</p>
                            )
                        }else{
                            return(
                                <p key={index} className='mb-0'>
                                    <Link href={`/categories/${slug.id}`}>
                                        <a>{slug.name}</a>
                                    </Link>
                                </p>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}