import { appApiIns } from "./AppApi";

export interface CreateUser{
    email: string,
    username: string,
    phone: string
}

export interface UpdateUser{
    id: number,
    email: string,
    username: string,
    phone: string
}

export interface GetUser{
    id: number,
    email: string,
    username: string,
    phone: string
}

export function createUser(){
    return appApiIns.post('users/create',{
    });
}

export function getUser(id:number){
    return appApiIns.get('users/'+id);
}

export function getUsers(){
    return appApiIns.get('users');
}

export function deleteUser(id:number){
    return appApiIns.delete('users/delete', {
        params: {
            id: id
        }
    });
}

export function updateUser(){
    return appApiIns.put('users/update');
}
