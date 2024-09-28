import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { userAuth } from "@/api/services/userAuth"
import toast from "react-hot-toast"

export default function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (!email || !password) {
            setError("Email and password are required")
            return
        }
        try {
            const data = await userAuth.loginUser({ email, password });
            toast.success('Logged In successfully')
            navigate('/dashboard')
            console.log(data)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#242424] text-white">
            <div className="w-full max-w-md p-8 space-y-8 bg-[#2a2a2a] rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center text-[#ffdf00]">Login</h1>
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
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-white">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 bg-[#3a3a3a] border border-[#ffdf00] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffdf00]"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <Button
                        type="submit"
                        className="w-full bg-[#ffdf00] text-[#242424] hover:bg-[#ffd000] transition-colors"
                    >
                        Log In
                    </Button>
                </form>
                <div className="space-y-4 text-center">
                    <Link to="/forgot-password" className="block text-[#ffdf00] hover:underline">
                        Forgot Password?
                    </Link>
                    <p className="text-sm">
                        Don't have an account?{" "}
                        <Link to='/register' className="text-[#ffdf00] hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}