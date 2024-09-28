import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getEmail } from '@/utils/localstorage'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { userAuth } from '@/api/services/userAuth'

export default function VerifyOTP() {
    const navigate = useNavigate()
    const [otp, setOtp] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        const email = getEmail();
        if (!email) {
            toast.error('Please register an account before verification');
            navigate('/register');
        } else {
            setEmail(email)
        }
    }, [navigate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        const newOtp = value.replace(/[^0-9]/g, '').slice(0, 4)
        setOtp(newOtp)
    }

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault()
        if (otp.length === 4) {
            try {
                const data = await userAuth.verifyUser({email,otp});
                toast.success('Verifcation successfull')
                navigate('/dashboard')
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        } else {
            toast.error('Please enter a valid otp')
        }
    }

    return (
        <div className="flex items-center justify-center mt-10 bg-[#242424] text-white">
            {email &&
                <div className=" p-8 space-y-8 bg-[#2a2a2a] rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold text-center text-[#ffdf00]">Enter OTP</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className='text-nowrap'>An otp has been send to your email {email}</div>
                        <div className="space-y-2">
                            <Input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={4}
                                value={otp}
                                onChange={handleChange}
                                placeholder="Enter 4-digit OTP"
                                className="w-full px-3 py-2 text-center text-2xl bg-[#3a3a3a] border-2 border-[#ffdf00] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffdf00] text-white"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-[#ffdf00] text-[#242424] hover:bg-[#ffd000] transition-colors"
                        >
                            Verify OTP
                        </Button>
                    </form>
                    {/* <p className="text-sm text-center">
                        Didn't receive the code?{" "}
                        <button className="text-[#ffdf00] hover:underline focus:outline-none">
                            Resend OTP
                        </button>
                    </p> */}
                </div>}
        </div>
    )
}