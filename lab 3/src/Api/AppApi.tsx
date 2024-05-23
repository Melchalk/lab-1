import axios from "axios";

export const appApiIns = axios.create(
    {
        baseURL : 'https://fakestoreapi.com/auth/',
        headers :{
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token') 
        }
    }
)