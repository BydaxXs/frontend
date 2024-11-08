import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute(){
    const {accessToken} = useContext(AuthContext)

    if(!accessToken){
        return <Navigate to = '/'/> 
    }else{
        return <Outlet/>
    }
}