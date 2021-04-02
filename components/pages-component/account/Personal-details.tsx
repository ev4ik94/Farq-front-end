import {useRouter} from "next/router"
import {useTranslation} from "react-i18next"
import {useEffect, useState} from "react"


/*---Styles----*/
import classes from "../../../styles/pages-components/account/account-slug.module.sass"

/*---Components---*/
import {NameForm} from './forms/Name-change-form'
import {EmailForm} from './forms/Change-email-form'
import {PasswordForm} from './forms/Password-change-form'

/*--Interface----*/

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

interface Person{
    first_name: string,
    last_name: string,
    email: string,
    password: string
}

/*---Hooks---*/
import {useAuth} from "../../../hooks/authentication.hook"
import {AxiosApi} from "../../../hooks/axios.hook"


export function PersonalDetails({object}:{object:IObjects[]}){
    const router = useRouter()
    const {t} = useTranslation()
    const MainLink = object.filter(item=>item.slug===router.query.slug).length?
        object.filter(item=>item.slug===router.query.slug)[0]:null
    const {getUserData, checkAuth} = useAuth()
    const {request, loading} = AxiosApi()

    const [activeForm, setActiveForm] = useState<string | null>(null)
    const [person, setPerson] = useState<Person>({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    })
    const [mount, setMount] = useState(true)

    useEffect(()=>{
        if(!checkAuth()){
            router.push('/')
        }
    }, [])

    useEffect(()=>{
        if(checkAuth()){
            if(mount){
                const data = getUserData()
                if(data && data!==null){
                    setPerson({...person,
                        email: data.email? data.email:'',
                        first_name:  data.first_name? data.first_name:'',
                        last_name: data.last_name? data.last_name:''
                    })
                }

                setMount(false)
            }
        }
    }, [mount])

    const saveChange = async(value)=>{
        let user = localStorage.getItem('user')
        user = user!==null && user ? JSON.parse(user) : {}

        await request(process.env.API_EDIT_NAME['ru']).then(result=>{
            console.log(result)
        }).catch(e=>console.log(e.message))


        if(user!==null){
            let newData = Object.assign(user, {...value})
            setPerson({...person, ...value})
            localStorage.setItem('user', JSON.stringify(newData))
            setActiveForm(null)
            console.log({...person, ...value})
        }
    }



    const showEditForm = ()=>{
        switch(activeForm){
            case 'name':
                return <NameForm object={person} setPerson={setPerson} setActiveForm={setActiveForm} saveChange={saveChange}/>
            case 'email':
                return <EmailForm object={person} setPerson={setPerson} setActiveForm={setActiveForm} saveChange={saveChange}/>
            case 'password':
                return <PasswordForm object={person} setPerson={setPerson} setActiveForm={setActiveForm}/>
            default:
                return ''
        }
    }

    return(
        <div className={`${classes['personal-details-wrap']} col-lg-9`}>
            <h1>{MainLink!==null&&MainLink.name?MainLink.name['ru']:''}</h1>
            <p>{MainLink!==null&&MainLink.description?MainLink.description:''}</p>

            <div className={`${classes['person-details']} col-lg-8 pl-0 mt-5 ${activeForm!==null?'d-none':''}`}>
                <div className={`d-flex justify-content-between`}>
                    <div>
                        <p className='mb-0 font-weight-bold'>{t('identity.form-signup-label1')}</p>
                        <p>{person.first_name?person.first_name:''} {person.last_name?person.last_name:''}</p>
                    </div>
                    <button onClick={()=>setActiveForm('name')}>{t('account.address-address-button')}</button>
                </div>

                <div className={`d-flex justify-content-between`}>
                    <div>
                        <p className='mb-0 font-weight-bold'>{t('identity.form-input1')}</p>
                        <p>{person.email?person.email:''}</p>
                    </div>
                    <button onClick={()=>setActiveForm('email')}>{t('account.address-address-button')}</button>
                </div>

                <div className={`d-flex justify-content-between`}>
                    <div>
                        <p className='mb-0 font-weight-bold'>{t('identity.form-input2')}</p>
                        <p>(First created on February 19, 2021)</p>
                    </div>
                    <button onClick={()=>setActiveForm('password')}>{t('account.address-address-button')}</button>
                </div>
            </div>

            <div>
                {
                    activeForm!==null ? (<>{showEditForm()}</>) : ''
                }
            </div>

        </div>
    )
}







