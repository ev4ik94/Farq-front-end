import {useState, useCallback} from 'react'
import {useRouter} from "next/router"
import axios from 'axios'



export function AxiosApi(){

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isRefreshToken, setIsRefreshToken] = useState(false)
    const [currentRequest, setCurrentRequest] = useState(null)
    const router = useRouter()



    const request = useCallback(async(url, method='GET', data=null, headers={})=>{
        setLoading(true)
        const instance = axios.create({
            withCredentials: true
        })

        await instance.interceptors.request.use(request=>{
            const deviceId = localStorage.getItem('deviceId')

                if(deviceId && deviceId!==null){
                    request.headers['device-id'] = deviceId
                }
                return request
            },
            error=>{
            return Promise.reject(error)
            })


        await instance.interceptors.response.use(response=>{
                setLoading(false)
            if(response.headers['device-id']){
                localStorage.setItem('deviceId', response.headers['device-id'])
            }
            return response
            },
            error=>{
            setLoading(false)
            const {response, config} = error

                if(response && response.status){
                    switch(response.status){
                        case 401:
                            instance({
                                method: 'POST',
                                url: process.env.API_LOGOUT['ru']
                            }).then(()=> {
                                localStorage.removeItem('user')
                                router.push('/')
                            })

                            break;
                        case 403:
                            console.log('403')
                            break;
                        case 404:
                            console.log('404')
                            break;
                        case 419:
                            if(!isRefreshToken){
                                instance({
                                    method: 'GET',
                                    url: process.env.API_REFRESH_TOKEN
                                }).then(()=>{
                                    setIsRefreshToken(true)
                                    instance({
                                        method: currentRequest.method,
                                        url: currentRequest.url,
                                        data: currentRequest.data,
                                        headers: currentRequest.headers
                                    }).then(()=>{
                                        setIsRefreshToken(false)
                                    })
                                })
                            }
                            break;
                        case 500:
                            console.log('500')
                            break;
                        default:
                            break;
                    }
                }
            return Promise.reject(error)

            })

        setCurrentRequest({
            method,
            url,
            data,
            headers
        })

        return await instance({
            method,
            url,
            data,
            headers
        })







    }, [])

    return {request, loading, error}
}