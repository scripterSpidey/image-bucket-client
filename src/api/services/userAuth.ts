

import axiosreq from "../axios.config"
import { userAuthEndpoints } from "../endpoints"

export type registerBodyType={
    userName:string,
    email:string,
    password:string,
    confirmPassword:string,
}

export type LoginBodyType={
    email:string,
    password:string
}

export const userAuth ={
    registerUser:async(body:registerBodyType)=>{
        const response = await axiosreq.post(userAuthEndpoints.register,body);
        return response.data;
    },
    verifyUser:async(body:{otp:string,email:string})=>{
        const response = await axiosreq.post(userAuthEndpoints.verify,body);
        return response.data;
    },
    loginUser:async(body:LoginBodyType)=>{
        const response = await axiosreq.post(userAuthEndpoints.login,body);
        return response.data;
    },
    authenticateUser:async()=>{
        const response = await axiosreq.post(userAuthEndpoints.authenticate);
        return response.data;
    },
    logoutUser:async()=>{
        const response = await axiosreq.post(userAuthEndpoints.logout);
        return response.data;
    }
}   