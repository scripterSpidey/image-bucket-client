
import Header from '@/sections/Header'
import { Outlet } from 'react-router-dom'

const Home = () => {
    return (
        <div className='min-h-screen flex flex-col'>
            <Header />
            <Outlet />
        </div>
    )
}

export default Home