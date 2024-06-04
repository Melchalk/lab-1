import { Button } from "react-bootstrap";
import { CreateProduct, GetProduct, UpdateProduct, getProducts } from "../api/ProductsApi";
import { useEffect, useState } from "react";
import ErrorToast from "../components/ErrorToast";
import CreateProductModal from "../components/Product/CreateProductModal";
import UpdateProductModal from "../components/Product/UpdateProductModal";
import ProductsTable from "../components/Product/ProductsTable";

export default function ProductPage(){
    const [stateResponse, setStateResponse] = useState<GetProduct[]>();    
    const [stateCreateRequest, setStateCreateRequest] = useState<CreateProduct>({
        title: '',
        price: 0,
        category: '',
        description: ''
    });       
    const [stateUpdateRequest, setStateUpdateRequest] = useState<UpdateProduct>({
        id: 0,
        title: null,
        price: null,
        category: null,
        description: null
    });       

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setError] = useState<any>();

    useEffect(() => {
        getProducts()
        .then((res) => {
            if (stateResponse != res.data){
                setStateResponse(res.data);
            }
        })
        .catch((error) => {
            setShowToast(true);
            if (error.response) {
                setError(error.response.data);
            } else if (error.request) {
                setError(error.request);
            } else {
                setError(error.message);
            }
        })
    }, []);  

    return(
        <>
            <Button variant="danger" className="col-md-1.5" onClick={() =>  setShowCreateModal(true)}>Создать продукт</Button>

            {stateResponse?.length == 0 ? <h4>Продукты не найдены</h4> :
                ProductsTable(stateResponse!, setShowUpdateModal, setStateUpdateRequest)}        

            {CreateProductModal(stateCreateRequest!, setStateCreateRequest,
                showCreateModal, setShowCreateModal, setShowToast, setError)}

            {UpdateProductModal(stateUpdateRequest!, setStateUpdateRequest,
                    showUpdateModal, setShowUpdateModal, setShowToast, setError)}

            {ErrorToast(showToast, setShowToast, errorMessage)}
        </>
    )
}