

export const userAuthEndpoints ={
    register:'/user/register',
    login:'/user/login',
    verify:'user/verify',
    authenticate:'/user/auth',
    logout:'/user/logout',
    ForgotPassword:'/user/forgot-password',
    forgotPasswordVerify:'/user/forgot-password-verify',
    resetPassword:'/user/reset-password'
}

export const imageEndpoints ={
    image:(imageId?:string)=> imageId ? `/user/image?imageId=${imageId}` : '/user/image',
}