import React, {useState, useEffect, useContext } from 'react' ; 
import {Outlet, useNavigate} from 'react-router-dom' ;

import useRefresh from '../hooks/useRefresh';
import { AppState } from '../App';
import Loading from './loading/Load.js';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true) ; 
    const refresh = useRefresh() ;
    const useAppState = useContext(AppState);
    const navigate = useNavigate() ; 


    useEffect(()=>{ 
        console.log(useAppState.login);
        const verifyRefreshToken = async ()=> {
            try{
                await refresh() ; 
            }
            catch (error){
                console.log(error);
                navigate('/login') ;
                
            }
            finally{
                setIsLoading(false) ; 
            }
        }
        !useAppState.login ? verifyRefreshToken() : setIsLoading(false) ; 
    }, [])

    return isLoading ? <Loading /> : <Outlet />

}

export default PersistLogin ;