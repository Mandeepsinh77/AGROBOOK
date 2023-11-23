import { useContext } from 'react';
import { useData } from '../useContext/DataContext';
import { AppState } from '../App';
import { useNavigate } from 'react-router-dom';

import axios from 'axios' ; 

const API = axios.create({
    baseURL: 'http://localhost:4000', 
    withCredentials: true
})

const useLogout = ()=> {
    const useAppState = useContext(AppState);
    const { setData, setshopname } = useData();
    const navigate = useNavigate() ; 

    const logout = async ()=> {
        try {
            const response = await API.get('/logout') ; 
            console.log(response);

            setData(null);
            setshopname(null);
            useAppState.setUserId(null) ;
            useAppState.setLogin(null) ;

            navigate('/login') ;

        } catch (error) {
            console.log(error);
        }
    }

    return logout ;
}

export default useLogout ;