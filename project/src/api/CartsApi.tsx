import { appApiIns } from "./AppApi";

export interface CreateCart{
    userId: number,
    date: string,
    products: ProductInCart[]
}

export interface UpdateCart{
    id: number,
    userId: number | null,
    date: string | null,
    products: ProductInCart[] | null
}

export interface ProductInCart{
    productId:number,
    quantity:number
}

export interface GetCart{
    id: number,
    userId: number,
    date: string,
    products: ProductInCart[]
}

export function createCart(request:CreateCart){
    return appApiIns.post('carts', {
        userId:5,
        date:'2020-02-03',
        products:[{productId:5,quantity:1},{productId:1,quantity:5}]
    });
}

export function getCart(id:number){
    return appApiIns.get('carts/'+id);
}

export function getCarts(){
    return appApiIns.get('carts');
}

export function deleteCart(id:number){
    return appApiIns.delete('carts/6');
}

export function updateCart(request:UpdateCart){
    return appApiIns.put('carts/7', {
        userId:3,
        date:'2019-12-10',
        products:[{productId:1,quantity:3}]
    });
}
