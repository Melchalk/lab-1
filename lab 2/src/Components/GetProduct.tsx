import { GetProductResponse } from './GetProductResponse';

export default function GetProduct(data:GetProductResponse[] | undefined)
{
    return (
        <>
            {data?.map((item:GetProductResponse) =>
                <li key={item.id}>
                <h3>Id of product: {item.id}</h3>
                <h3>Name of product: {item.title}</h3>
                <br />
                </li>
            )}
        </>
    );
}