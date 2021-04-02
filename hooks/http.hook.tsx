import {useState, useCallback} from 'react'



export default function useHttp(){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url,method='GET', body=null, headers={}, signal=null)=>{

        setLoading(true);

        try{
            if(body){
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }

            const response = await fetch(url, {
                method,headers,body,signal
            })

            if(!response.ok){
                console.log(response.status)
                await setError(response.status || 400);
            }



            const data = await response.json();
            setLoading(false);

            return data;
        }catch(e){
            setLoading(false);

            throw e;
        }
    }, []);

    const clearError = useCallback(()=>setError(null), []);

    return {loading, request, error, clearError};

}