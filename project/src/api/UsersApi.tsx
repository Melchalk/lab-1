import { appApiIns } from "./AppApi";

export interface CreateUser{
    email: string,
    username: string,
    phone: string
}

export interface UpdateUser{
    id: number,
    email: string | null,
    username: string | null,
    phone: string | null
}

export interface GetUser{
    id: number,
    email: string,
    username: string,
    phone: string
}

export function createUser(request:CreateUser){
    return appApiIns.post('users', {
        email:'John@gmail.com',
        username:'johnd',
        password:'m38rmF$',
        name:{
            firstname:'John',
            lastname:'Doe'
        },
        address:{
            city:'kilcoole',
            street:'7835 new road',
            number:3,
            zipcode:'12926-3874',
            geolocation:{
                lat:'-37.3159',
                long:'81.1496'
            }
        },
        phone:'1-570-236-7033'
    });
}

export function getUser(id:number){
    return appApiIns.get('users/'+id);
}

export function getUsers(){
    return appApiIns.get('users');
}

export function deleteUser(id:number){
    return appApiIns.delete('users/6');
}

export function updateUser(request:UpdateUser){
    return appApiIns.put('users',{
        email:'John@gmail.com',
        username:'johnd',
        password:'m38rmF$',
        name:{
            firstname:'John',
            lastname:'Doe'
        },
        address:{
            city:'kilcoole',
            street:'7835 new road',
            number:3,
            zipcode:'12926-3874',
            geolocation:{
                lat:'-37.3159',
                long:'81.1496'
            }
        },
        phone:'1-570-236-7033'
        });
}
