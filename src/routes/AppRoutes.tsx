import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "../pages/Home";
import Introduction from "@/sections/Introduction";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import VerifyOTP from "@/pages/VerifyOTP";
import Dashboard from "@/pages/Dashboard";
import LoginPage from "@/pages/Login";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPasswordPage from "@/pages/ResetPassword";
import UploadImage from "@/pages/UploadImage";
import { lazy, Suspense } from "react";


const Bucket = lazy(() => import('../pages/Bucket'))

const AppRoutes = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Home />} >
                <Route index element={<Introduction />}></Route>
                <Route path="register" element={<Register />} />
                <Route path='login' element={<LoginPage />}></Route>
                <Route path="verify" element={<VerifyOTP />} />
                <Route path="forgot-password" element={<ForgotPassword />}></Route>
                <Route path="reset-password" element={<ResetPasswordPage />}></Route>
            </Route>

            <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<UploadImage />}></Route>
                <Route
                    path='bucket'
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <Bucket />
                        </Suspense>
                    }
                />
            </Route>

            <Route path="*" element={<NotFound />}></Route>
        </>
    )
)

export default AppRoutes;