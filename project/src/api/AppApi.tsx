import axios from "axios";

export const appApiIns = axios.create(
    {
        baseURL : 'https://fakestoreapi.com/',
        headers :{
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('token') 
        }
    }
)