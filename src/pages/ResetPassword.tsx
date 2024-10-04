"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { getEmail } from "@/utils/localstorage"
import { userAuth } from "@/api/services/userAuth"
import toast from "react-hot-toast"

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("");
  const [email, setEmail] = useState('')

  useEffect(() => {
    const storedEmail = getEmail();
    if (!storedEmail) {
      navigate('/login');
      return;
    }
    setEmail(storedEmail)
  }, [navigate])
  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setMessage("")

    if (!newPassword || !confirmPassword) {
      setError("Both fields are required")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (newPassword.length < 4) {
      setError("Password must be at least 4 characters long")
      return
    }
    try {
      await userAuth.resetPassword({email,newPassword});
      navigate('/login');
      toast.success('Password reset successfully')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#242424] text-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-[#2a2a2a] rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-[#ffdf00]">Reset Password</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="newPassword" className="text-white">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[#3a3a3a] border border-[#ffdf00] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffdf00]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 bg-[#3a3a3a] border border-[#ffdf00] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ffdf00]"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}
          <Button
            type="submit"
            className="w-full bg-[#ffdf00] text-[#242424] hover:bg-[#ffd000] transition-colors"
          >
            Reset Password
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