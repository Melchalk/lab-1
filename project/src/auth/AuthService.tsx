import { appApiIns } from "../api/AppApi";

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

export function loginUser(){
    return appApiIns.post('auth/login',{
        username: "mor_2314",
        password: "83r5^_"
    });
}

export function registerUser(){
    return appApiIns.post('auth/login',{
        username: "mor_2314",
        password: "83r5^_"
    });
}