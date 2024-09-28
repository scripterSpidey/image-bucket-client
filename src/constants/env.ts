const getEnv =(key:string,defaultValue?: string):string  =>{
    const value = import.meta.env[key] || defaultValue;
    
    if(value == undefined){
        throw new Error(`missing env variable ${key}`)
    }
    return value;
}

export const BASE_URL = getEnv("VITE_BASE_URL")
