
import useAuth from '@/hooks/useAuth';
import Header from '@/sections/Header'
import { Outlet, useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    const { loading,activeUser, error } = useAuth();
    if(loading){
        return
    }
    if(error){
        console.log(error)
        navigate('/')
    }
    return (
        <div>
            <Header activeUser={activeUser}/>
            <Outlet />
        </div>
    )
}

export default Dashboard