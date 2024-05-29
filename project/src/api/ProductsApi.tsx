import { appApiIns } from "./AppApi";

export interface CreateProduct{
    title: string,
    price: number,
    category: string,
    description: string
}

export interface UpdateProduct{
    id: number,
    title: string,
    price: number,
    category: string,
    description: string
}

export interface GetProduct{
    id: number,
    title: string,
    price: number,
    category: string,
    description: string
}

export function createProduct(){
    return appApiIns.post('products/create',{
    });
}

export function getProduct(id:string){
    return appApiIns.get('products/'+id);
}

export function getProducts(){
    return appApiIns.get('products');
}

export function deleteProduct(id:string){
    return appApiIns.delete('product/delete', {
        params: {
            id: id
        }
    });
}

export function updateProduct(){
    return appApiIns.put('products/update');
}
