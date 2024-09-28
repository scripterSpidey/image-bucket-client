import { userAuth } from "@/api/services/userAuth";
import { useEffect, useState } from "react";

const useAuth = ()=>{
    const [loading, setLoading] = useState(true);
    const [activeUser, setActiveUser] = useState<object | undefined>(undefined)
    const [error, setError] = useState(false)

    useEffect(()=>{
        const validateUser = async()=>{
            setLoading(true);
            try {
                const data = await userAuth.authenticateUser();
                setActiveUser(data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setError(true)
            }
        }
        validateUser()
    },[])

    return {loading,activeUser,error}
}

export default useAuth;