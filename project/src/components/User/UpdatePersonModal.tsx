import { FloatingLabel, Form, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UpdateLibrarianRequest, updateLibrarian } from '../../api/LibrarianApi';
import { useNavigate } from 'react-router-dom';

export default function UpdatePersonModal(
    stateRequest: UpdateLibrarianRequest, setStateRequest: React.Dispatch<React.SetStateAction<UpdateLibrarianRequest>>,
    show:boolean, setShowModal: any,
    setShowToast: any, setError: React.Dispatch<any>) {

    const navigate = useNavigate();
    
    const onUpdateUser = () => {
        updateLibrarian(stateRequest)
            .then(() =>{
                setShowModal(false);
                navigate('/account');
            })
            .catch((error) => {
                navigate('/account');
                setShowModal(false);
                setShowToast(true);

                if (error.response) {
                    setError(error.response.data);
                  } else if (error.request) {
                    setError(error.request);
                  } else {
                    setError(error.message);
                  }
            })
    };

    return (
        <Modal show={show} onClose={() => setShowModal(false)}>
            <Modal.Header closeButton onClick={() => setShowModal(false)}>
                <Modal.Title>Изменение аккаунта</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack gap={3} className="mx-auto">
                    <FloatingLabel label="ФИО">
                        <Form.Control defaultValue={stateRequest.fullName? stateRequest.fullName : "Не задано"} 
                            isInvalid={stateRequest.fullName == null || stateRequest.fullName?.length == 0}
                            placeholder="ФИО" onChange={(t) => 
                                setStateRequest({...stateRequest, fullName: t.target.value})}/>
                    </FloatingLabel>
                    <FloatingLabel label="Номер телефона">
                        <Form.Control defaultValue={stateRequest.phone? stateRequest.phone : "Не задано"}
                            isInvalid={stateRequest.phone == null || stateRequest.phone?.length == 0}
                            placeholder="Номер телефона" onChange={(t) => 
                                setStateRequest({...stateRequest, phone: t.target.value})}/>    
                    </FloatingLabel>
                    <FloatingLabel label="Номер библиотеки">
                        <Form.Control  value={stateRequest.libraryNumber? stateRequest.libraryNumber : "Не задано"} 
                            type="number" placeholder="Номер библиотеки" onChange={(t) => 
                                setStateRequest({...stateRequest, libraryNumber:
                                (!isNaN(Number(t.target.value)) && Number(t.target.value) != 0)  ? Number(t.target.value) : null})}/>
                    </FloatingLabel>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => onUpdateUser()}> Обновить </Button>
                <Button variant="secondary" onClick={() => setShowModal(false)}> Закрыть </Button>
            </Modal.Footer>
        </Modal>
  );
}