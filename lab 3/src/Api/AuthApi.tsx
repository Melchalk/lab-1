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
        email: request.email,
        password: request.password
    });
}

export function registerUser(request:RegisterRequest){
    return appApiIns.post('register',{
        name: request.name,
        email: request.email,
        password: request.password
    });
}