import { userAuth } from '@/api/services/userAuth'
import Logo from '@/components/Icons/Logo'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
type HeaderProps = {
    activeUser?: object
}

const Header = ({ activeUser }: HeaderProps) => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await userAuth.logoutUser();
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='h-20 pr-10 justify-between  flex items-center p-5'>
            <Logo />
            <div>
                {activeUser &&
                    <Button
                        onClick={handleLogout}
                        className='hover:bg-brand-color bg-white text-black'>Logout</Button>}
            </div>
        </div>
    )
}

export default Header