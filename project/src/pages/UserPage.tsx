import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import UsersTable from "../components/User/UsersTable";
import ErrorToast from "../components/ErrorToast";
import CreateUserModal from "../components/User/CreateUserModal";
import UpdateUserModal from "../components/User/UpdateUserModal";

export default function UserPage(){
    const [stateResponse, setStateResponse] = useState<GetUserResponse[]>();    
    const [stateCreateRequest, setStateCreateRequest] = useState<CreateUserRequest>();    
    const [stateUpdateRequest, setStateUpdateRequest] = useState<UpdateUserRequest>();      

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setError] = useState<any>();

    useEffect(() => {
        getUsers()
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
            <Button variant="warning" className="col-md-1.5 mb-3" onClick={() => setShowCreateModal(true)}>Добавить пользователя</Button>

            {stateResponse?.length == 0 ? <h4>Пользователи не найдены</h4> :
                UsersTable(stateResponse!, setShowUpdateModal, setStateUpdateRequest)}

            {CreateUserModal(stateCreateRequest, setStateCreateRequest,
                showCreateModal, setShowCreateModal, setShowToast, setError)}
            {UpdateUserModal(stateUpdateRequest, setStateUpdateRequest,
                showUpdateModal, setShowUpdateModal, setShowToast, setError)}

            {ErrorToast(showToast, setShowToast, errorMessage)}
        </>
    )
}