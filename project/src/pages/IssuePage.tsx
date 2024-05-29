import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CreateIssueRequest, GetIssueResponse, getIssuesInLibrary } from "../api/IssueApi";
import IssuesTable from "../components/Issue/IssuesTable";
import ErrorToast from "../components/ErrorToast";
import CreateIssueModal from "../components/Issue/CreateIssueModal";
import { useAppSelector } from "../redux/hooks";
import { GetBookResponse, getFreeBooks } from "../api/BookApi";
import DeleteIssueModal from "../components/Issue/DeleteIssueModal";

export default function IssuePage(){
    const [stateResponse, setStateResponse] = useState<GetIssueResponse[]>();    
    const [stateBookIdResponse, setStateBookIdResponse] = useState<GetBookResponse[]>();    

    const [stateCreateRequest, setStateCreateRequest] = useState<CreateIssueRequest>({
        readerId: '',
        period: 0,
        booksId: []
    });    

    const [stateOne, setStateOne] = useState<GetIssueResponse>({
        id: '',
        readerId: '',
        returnDate: '',
        booksId: []
    });    

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setError] = useState<any>();

    const libraryNumber = useAppSelector((state) => state.auth.libraryNumber)

    useEffect(() => {
        if (libraryNumber != null){
            setStateCreateRequest(stateCreateRequest => ({...stateCreateRequest, libraryNumber: libraryNumber}));

            getIssuesInLibrary(libraryNumber!)
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

            getFreeBooks(libraryNumber)
                .then((res) =>{
                    setStateBookIdResponse(res.data);
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
        }
    }, []);  

    return(
        <>
            {libraryNumber != null
                ? <Button variant="warning" className="col-md-1.5 mb-3" onClick={() => setShowCreateModal(true)}>Создать выдачу</Button>
                : <h2>Чтобы добавить выдачу - создайте библиотеку</h2>}

            {libraryNumber == null || stateResponse?.length == 0 ? <h4>Выдачи не найдены</h4> :
                IssuesTable(stateResponse!, setStateOne, setShowDeleteModal)}

            {CreateIssueModal(stateBookIdResponse!, stateCreateRequest, setStateCreateRequest,
                showCreateModal, setShowCreateModal, setShowToast, setError)}


            {DeleteIssueModal(stateOne, showDeleteModal, setShowDeleteModal, setShowToast, setError)}

            {ErrorToast(showToast, setShowToast, errorMessage)}
        </>
    )
}