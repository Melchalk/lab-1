import { appApiIns } from "./AppApi";

export interface CreateCart{
    userId: number,
    date: string,
    products: ProductInCart[]
}

export interface UpdateCart{
    id: number,
    userId: number,
    date: string,
    products: ProductInCart[]
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

export function createCart(){
    return appApiIns.post('carts/create',{
    });
}

export function getCart(id:number){
    return appApiIns.get('carts/'+id);
}

export function getCarts(){
    return appApiIns.get('carts');
}

export function deleteCart(id:number){
    return appApiIns.delete('carts/delete', {
        params: {
            id: id
        }
    });
}

export function updateCart(){
    return appApiIns.put('carts/update');
}
