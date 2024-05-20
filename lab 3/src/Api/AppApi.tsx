import axios from "axios";

export const appApiIns = axios.create(
    {
        baseURL : 'http://localhost/',
        headers :{
            'Authorization' : localStorage.getItem('accessToken') 
        }
    }
)