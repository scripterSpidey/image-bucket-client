
import { Axis3D } from "lucide-react"
import axiosreq from "../axios.config"
import { imageEndpoints, userAuthEndpoints } from "../endpoints"

export type registerBodyType = {
    userName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export type LoginBodyType = {
    email: string,
    password: string
}

export const userAuth = {
    registerUser: async (body: registerBodyType) => {
        const response = await axiosreq.post(userAuthEndpoints.register, body);
        return response.data;
    },
    verifyUser: async (body: { otp: string, email: string }) => {
        const response = await axiosreq.post(userAuthEndpoints.verify, body);
        return response.data;
    },
    loginUser: async (body: LoginBodyType) => {
        const response = await axiosreq.post(userAuthEndpoints.login, body);
        return response.data;
    },
    authenticateUser: async () => {
        const response = await axiosreq.post(userAuthEndpoints.authenticate);
        return response.data;
    },
    logoutUser: async () => {
        const response = await axiosreq.post(userAuthEndpoints.logout);
        return response.data;
    },
    getOTPForForgotPassword: async (body: { email: string }) => {
        const response = await axiosreq.post(userAuthEndpoints.ForgotPassword, body);
        return response.data;
    },
    verifyOTPforForgotPassword: async (body: { otp: string, email: string }) => {
        const response = await axiosreq.post(userAuthEndpoints.forgotPasswordVerify, body);
        return response.data;
    },
    resetPassword: async (body: { newPassword: string, email: string }) => {
        const response = await axiosreq.post(userAuthEndpoints.resetPassword, body);
        return response.data;
    }
}

export const imageServices = {
    uploadImages: async (body: FormData) => {
        const response = await axiosreq.post(imageEndpoints.image(), body);
        return response.data;
    },
    fetchImages: async () => {
        const response = await axiosreq.get(imageEndpoints.image());
        return response.data
    },
    deleteImage: async (imageId: string) => {
        const response = await axiosreq.delete(imageEndpoints.image(imageId));
        return response.data;
    },
    editImage:async(imageId:string,body:{imageTitle:string})=>{
        const response = await axiosreq.patch(imageEndpoints.image(imageId),body);
        return response.data;
    }
}