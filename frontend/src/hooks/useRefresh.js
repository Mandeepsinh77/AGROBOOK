import { useContext } from 'react';
import axios from 'axios' ; 
import { jwtDecode } from 'jwt-decode';

import { useData } from '../useContext/DataContext';
import { AppState } from '../App';

const API = axios.create({
    baseURL: 'http://localhost:4000', 
    withCredentials: true
})

const useRefresh = () => {
    const useAppState = useContext(AppState);
    const { setData, setshopname } = useData();

    const refresh = async ()=> {
        const response = await API.get('/refresh')
        const user_token = response.data.user_token ;
        const user = jwtDecode(user_token).user ;
        
        const username = user.username;
        const shopname = user.shopname;
        const userId = user.id;

        setData(username);
        setshopname(shopname);
        useAppState.setUserId(userId) ;
        useAppState.setLogin(true) ;
    }

    return refresh ;
}

export default useRefresh ;