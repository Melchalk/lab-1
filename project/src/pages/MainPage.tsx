import { Button, Stack } from "react-bootstrap";
import { CreateLibraryRequest, GetLibraryResponse, UpdateLibraryRequest, getLibrary } from "../api/LibraryApi";
import { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import ErrorToast from "../components/ErrorToast";
import CreateLibraryModal from "../components/Library/CreateLibraryModal";
import DeleteLibraryModal from "../components/Library/DeleteLibraryModal";
import UpdateLibraryModal from "../components/Library/UpdateLibraryModal";

export default function MainPage(){
    const [stateResponse, setStateResponse] = useState<GetLibraryResponse | null>(null);    

    const [stateCreateRequest, setStateCreateRequest] = useState<CreateLibraryRequest>({
        title: '',
        address: '',
        phone: ''
    });    

    const [stateUpdateRequest, setStateUpdateRequest] = useState<UpdateLibraryRequest>({
        number: 0,
        title: null,
        address: null,
        phone: null
    });    

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setError] = useState<any>();

    const libraryNumber = useAppSelector((state) => state.auth.libraryNumber);

    useEffect(() => {
        if (libraryNumber != null){
            setStateUpdateRequest(stateUpdateRequest => ({...stateUpdateRequest, number: libraryNumber!}));

            getLibrary(libraryNumber!)
            .then((res) =>{
                if (stateResponse != res.data){
                    setStateResponse(res.data);
                    setStateUpdateRequest(res.data);
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
        }
    }, []);  

    return(
        <>
            {stateResponse != null
            ?   <Stack gap={2} className="mx-auto">
                    <h1> Информация о библиотеке</h1>
                    <h4> Название: {stateResponse.title}</h4>
                    <h4> Адрес: {stateResponse.address}</h4>
                    <h4 className="mb-3"> Номер телефона: {stateResponse.phone}</h4>

                    <h2> Статистика</h2>
                    <h4> Сотрудники: {stateResponse.librariansCount}</h4>
                    <h4> Книги: {stateResponse.booksCount}</h4>
                    <h4 className="mb-3"> Выдачи: {stateResponse.issuesCount}</h4>

                    <h3> Создана {stateResponse.ownerName} </h3>
                    <h5 className="mb-3"> Номер администратора: {stateResponse.ownerPhone}</h5>

                    <Stack gap={3} direction= "horizontal" >
                        <Button variant="warning" className="col-md-1.5" onClick={() =>  setShowUpdateModal(true)}>Обновить</Button>
                        <Button variant="danger" className="col-md-1.5" onClick={() => setShowDeleteModal(true)}>Удалить</Button>
                    </Stack>
                </Stack>
                : <>
                    <Button variant="warning" className="col-md-1.5" onClick={() =>  setShowCreateModal(true)}>Создать библиотеку</Button>
                    <h2>Библиотека не найдены</h2>
                </> 
            }
                    
            {CreateLibraryModal(stateCreateRequest, setStateCreateRequest,
                showCreateModal, setShowCreateModal, setShowToast, setError)}

            {UpdateLibraryModal(stateUpdateRequest, setStateUpdateRequest,
                    showUpdateModal, setShowUpdateModal, setShowToast, setError)}

            {DeleteLibraryModal(libraryNumber!, showDeleteModal, setShowDeleteModal, setShowToast, setError)}

            {ErrorToast(showToast, setShowToast, errorMessage)}
        </>
    )
}