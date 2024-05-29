import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CreateCart, GetCart, UpdateCart, getCarts } from "../api/CartsApi";
import ErrorToast from "../components/ErrorToast";
import CartsTable from "../components/Cart/CartsTable";
import CreateCartModal from "../components/Cart/CreateCartModal";
import UpdateCartModal from "../components/Cart/UpdateCartModal";

export default function CartPage(){
    const [stateResponse, setStateResponse] = useState<GetCart[]>();    
    const [stateCreateRequest, setStateCreateRequest] = useState<CreateCart>();    
    const [stateUpdateRequest, setStateUpdateRequest] = useState<UpdateCart>();      

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setError] = useState<any>();

    useEffect(() => {
            getCarts()
            .then((res) =>{
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
            <Button variant="warning" className="col-md-1.5 mb-3" onClick={() => setShowCreateModal(true)}>Создать карточку</Button>

            {stateResponse?.length == 0 ? <h4>Карточки не найдены</h4> :
                CartsTable(stateResponse!, setShowUpdateModal, setStateUpdateRequest)}

            {CreateCartModal(stateCreateRequest!, setStateCreateRequest,
                showCreateModal, setShowCreateModal, setShowToast, setError)}
            {UpdateCartModal(stateUpdateRequest!, setStateUpdateRequest,
                showUpdateModal, setShowUpdateModal, setShowToast, setError)}

            {ErrorToast(showToast, setShowToast, errorMessage)}
        </>
    )
}