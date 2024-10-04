"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { userAuth } from "@/api/services/userAuth"
import { storeEmail } from "@/utils/localstorage"

export default function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [error, setError] = useState("");
    const [otpStatus, setOTPStatus] = useState('Send OTP');
    const [OTP, setOTP] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setMessage("")
        if (otpStatus === 'Send OTP') {
            if (!email) {
                setError("Email is required")
                return
            }
            try {
                await userAuth.getOTPForForgotPassword({ email });
                setOTPStatus('Verify OTP');
            } catch (error) {
                console.log(error)
            }
        }else{
            if(!OTP.trim()){
                setError('OTP is required')
                return
            }
            try {
                const data = await userAuth.verifyOTPforForgotPassword({otp:OTP,email});
                storeEmail(data.email);
                navigate('/reset-password')
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#242424] text-white">
            <div className="w-full max-w-md p-8 space-y-8 bg-[#2a2a2a] rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center text-[#ffdf00]">Forgot Password</h1>
                <p className="text-center text-gray-300">
                    Enter your email address and we'll send you instructions to reset your password.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-[#3a3a3a] border border-[#ffdf00] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffdf00]"
                        />
                    </div>
                    {otpStatus === 'Verify OTP' && <div className="space-y-2">
                        <Label htmlFor="otp" className="text-white">OTP</Label>
                        <Input
                            id="otp"
                            type="text"
                            placeholder="Enter otp"
                            value={OTP}
                            onChange={(e) =>  setOTP(e.target.value)}
                            className="w-full px-3 py-2 bg-[#3a3a3a] border border-[#ffdf00] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffdf00]"
                        />
                    </div>}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {message && <p className="text-green-500 text-sm">{message}</p>}
                    <Button
                        type="submit"
                        className="w-full bg-brand-color text-[#242424] hover:bg-[#ffd000] transition-colors"
                    >
                        {otpStatus}
                    </Button>
                </form>
                <div className="text-center">
                    <Link to="/login" className="text-[#ffdf00] hover:underline">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}