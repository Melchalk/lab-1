import { appApiIns } from "./AppApi";

export interface CreateProduct{
    title: string,
    price: number,
    category: string,
    description: string
}

export interface UpdateProduct{
    id: number,
    title: string | null,
    price: number | null,
    category: string | null,
    description: string | null
}

export interface GetProduct{
    id: number,
    title: string,
    price: number,
    category: string,
    description: string
}

export function createProduct(request:CreateProduct){
    return appApiIns.post('products', {
        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
    });
}

export function getProduct(id:number){
    return appApiIns.get('products/'+id);
}

export function getProducts(){
    return appApiIns.get('products');
}

export function deleteProduct(id:number){
    return appApiIns.delete('products/6');
}

export function updateProduct(request:UpdateProduct){
    return appApiIns.put('products/7', {
        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
    });
}
