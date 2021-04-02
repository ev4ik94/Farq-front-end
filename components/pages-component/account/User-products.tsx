
/*--Interface----*/

import {useRouter} from "next/router";
import {useTranslation} from "react-i18next";

interface IObjects{
    id: number,
    slug: string,
    name: {
        ru: string,
        uz: string
    },
    description: string,
    icon: string,
    link_name: string
}


export function UserProducts({object}:{object:IObjects[]}){
    const router = useRouter()
    const {t} = useTranslation()
    const MainLink = object.filter(item=>item.slug===router.query.slug).length?
        object.filter(item=>item.slug===router.query.slug)[0]:null

    return(
        <div className={`col-lg-9`}>
            <h1>{MainLink!==null && MainLink.name ? MainLink.name['ru']: ''}</h1>
            <p>{t('account.user-products')}</p>
            <style jsx>
                {
                    `
                        p{
                            font-size: 2rem;
                            text-align: center;
                            padding: 30px 0px;
                            color: #007aff;
                            font-weight: bold;
                        }
                    `
                }
            </style>
        </div>
    )
}