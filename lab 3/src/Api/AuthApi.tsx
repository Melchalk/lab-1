import { appApiIns } from "../Api/AppApi";

export interface LoginResponse{
    token : string;
}

export interface LoginRequest{
    email:string,
    password:string
}

export interface RegisterRequest{
    name:string,
    email:string,
    password:string
}

export function loginUser(request:LoginRequest){
    return appApiIns.post('login',{
        username: "mor_2314",
        password: "83r5^_"
    });
}

export function registerUser(request:RegisterRequest){
    return appApiIns.post('login',{
        username: "mor_2314",
        password: "83r5^_"
    });
}