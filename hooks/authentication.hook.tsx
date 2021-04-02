import {useState} from 'react'
import {useRouter} from "next/router"
import {AxiosApi} from "./axios.hook"


/*---Interface---*/
interface IUser{
    id: number,
    name: string,
    lastName: string,
    email: string,
    password: string,
    address: string,
    phone: string
}

export function useAuth(){
    const [user, setUser] = useState<IUser | null>(null)
    const router = useRouter()
    const {request, loading} = AxiosApi()

    const login = (data)=>{
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
    }



    const logout = async()=>{
        request(process.env.API_LOGOUT['ru'], 'POST').then(()=>{
            localStorage.removeItem('user')
            setUser(null)
            router.push('/')
        }).catch(e=>console.log(e.message))

    }

    const checkAuth = ()=>{
         return localStorage.getItem('user') && localStorage.getItem('user')!==null?true:false
    }

    const getUserData = ()=>{
        const userData = localStorage.getItem('user')
        return JSON.parse(userData)
    }

    return {user, login, logout, checkAuth, getUserData}

}