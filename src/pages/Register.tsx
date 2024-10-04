
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { userAuth } from "@/api/services/userAuth"
import { storeEmail } from "@/utils/localstorage"

export default function Register() {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("") 
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        setError("");
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = emailRegex.test(email);

        if (!email.trim() || !password.trim() || !confirmPassword.trim() || !userName.trim()) {
            setError("All fields are required")
            return
        }
        if (password.length < 4) {
            setError('Password is too weak')
            return;
        }
        if (!isValidEmail) {
            setError('Email is not valid');
            return
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match")
            return
        }

        try {
            const body = {
                userName,
                email,
                password,
                confirmPassword
            }
            const data = await userAuth.registerUser(body);
            storeEmail(data.email);
            navigate('/verify')
        } catch (error) {
            console.log('error in form',error)
        }
    }

    return (
        <div className="flex items-center justify-center flex-grow  text-white">
            <div className="w-full max-w-md p-8 space-y-4  rounded-xl shadow-lg shadow-black">
                <h1 className="text-3xl font-bold text-center text-brand-color">REGISTER</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-white">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Enter your username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full px-3 py-2 focus:border-2 focus:border-brand-color rounded-md "
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 focus:border-2 focus:border-brand-color rounded-md "
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-white">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2   rounded-md focus:border-2 focus:border-brand-color "
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Retype password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2   rounded-md focus:border-2 focus:border-brand-color"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button
                        type="submit"
                        className="w-full bg-[#ffdf00] text-[#242424] hover:bg-[#ffd000] transition-colors"
                    >
                        Get OTP
                    </Button>
                </form>
                <div className="space-y-4 text-center">
                    <Link to="/forgot-password" className="block text-white hover:underline">
                        Forgot Password?
                    </Link>
                    <p className="text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#ffdf00] hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}