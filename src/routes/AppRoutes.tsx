import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "../pages/Home";
import Introduction from "@/sections/Introduction";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import VerifyOTP from "@/pages/VerifyOTP";
import Dashboard from "@/pages/Dashboard";
import LoginPage from "@/pages/Login";

const AppRoutes = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/"  element={<Home />} >
                <Route index element={<Introduction/>}></Route>
                <Route path="register" element={<Register/>}/>
                <Route path='login' element={<LoginPage/>}></Route>
                <Route path="verify" element={<VerifyOTP/>}/>
            </Route>

            <Route path="/dashboard" element={<Dashboard/>}>
                
            </Route>

            <Route path="*" element={<NotFound/>}></Route>
        </>
    )
)

export default AppRoutes;