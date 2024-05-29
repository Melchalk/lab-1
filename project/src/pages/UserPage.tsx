import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ErrorToast from "../components/ErrorToast";
import CreateUserModal from "../components/User/CreateUserModal";
import UsersTable from "../components/User/UsersTable";
import { CreateUser, GetUser, getUsers } from "../api/UsersApi";
import DeleteUserModal from "../components/User/DeleteIssueModal";

export default function UserPage(){
    const [stateResponse, setStateResponse] = useState<GetUser[]>();    
    const [stateCreateRequest, setStateCreateRequest] = useState<CreateUser>();    
    const [stateDeleteRequest, setStateDeleteRequest] = useState<GetUser>();      

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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
                UsersTable(stateResponse!, setStateDeleteRequest, setShowDeleteModal)}

            {CreateUserModal(stateCreateRequest!, setStateCreateRequest,
                showCreateModal, setShowCreateModal, setShowToast, setError)}
                
            {DeleteUserModal(stateDeleteRequest!, showDeleteModal, setShowDeleteModal, setShowToast, setError)}
            
            {ErrorToast(showToast, setShowToast, errorMessage)}
        </>
    )
}