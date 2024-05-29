import { FloatingLabel, Form, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { UpdateReaderRequest, deleteReader, updateReader } from '../../api/ReaderApi';

export default function UpdateReaderModal(
    stateRequest: UpdateReaderRequest, setStateRequest: any,
    show:boolean, setShowModal: any,
    setShowToast: any, setError: React.Dispatch<any>) {

    const navigate = useNavigate();
    
    const onUpdateReader = () => {
        updateReader(stateRequest)
            .then(() =>{
                setShowModal(false);
                navigate('/readers');
            })
            .catch((error) => {
                navigate('/readers');
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

    const onDeleteReader = () => {
        deleteReader(stateRequest.id)
            .then(() => {
                setShowModal(false);
                navigate('/readers');
            })
            .catch((error) => {
                navigate('/readers');
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
                <Modal.Title>Обновление читателя</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <Stack gap={3} className="mx-auto">
                    <FloatingLabel label="ФИО">
                        <Form.Control defaultValue={stateRequest.fullName ? stateRequest.fullName : "Не задано"}
                            isInvalid={stateRequest.fullName == null || stateRequest.fullName?.length == 0}
                            placeholder="ФИО" onChange={(t) => 
                                setStateRequest({...stateRequest, fullName: t.target.value})}/>
                    </FloatingLabel>
                    <FloatingLabel label="Номер телефона">
                        <Form.Control defaultValue={stateRequest.phone? stateRequest.phone : "Не задано"}
                            placeholder="Номер телефона" onChange={(t) => 
                                setStateRequest({...stateRequest, phone: t.target.value})}/>    
                    </FloatingLabel>
                    <FloatingLabel label="Адрес регистрации">
                        <Form.Control defaultValue={stateRequest.registrationAddress? stateRequest.registrationAddress : "Не задано"}
                            placeholder="Адрес регистрации" onChange={(t) => 
                                setStateRequest({...stateRequest, registrationAddress: t.target.value})}/>    
                    </FloatingLabel>
                    <FloatingLabel label="Возраст">
                        <Form.Control defaultValue={stateRequest.age? stateRequest.age : "Не задано"} 
                            isInvalid={stateRequest.age != null && stateRequest.age <= 14}
                            type="number" placeholder="Возраст" onChange={(t) => 
                                setStateRequest({...stateRequest, age:
                                    Number(t.target.value) >= 0 ? Number(t.target.value) : null})}/>
                    </FloatingLabel>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => onUpdateReader()}> Обновить </Button>
                <Button variant="secondary" onClick={() => setShowModal(false)}> Закрыть </Button>
                <Button variant="danger" onClick={() => onDeleteReader()}> Удалить </Button>    
            </Modal.Footer>
        </Modal>
  );
}