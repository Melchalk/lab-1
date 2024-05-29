import { FloatingLabel, Form, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { CreateReaderRequest, createReader } from '../../api/ReaderApi';

export default function CreateReaderModal(
    stateRequest: CreateReaderRequest, setStateRequest: any,
    show:boolean, setShowModal: any,
    setShowToast: any, setError: React.Dispatch<any>) {

    const navigate = useNavigate();
    
    const onCreateReader = () => {
        createReader(stateRequest)
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

    return (
        <Modal show={show} onClose={() => setShowModal(false)}>
            <Modal.Header closeButton onClick={() => setShowModal(false)}>
                <Modal.Title>Добавление книги</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <Stack gap={3} className="mx-auto">
                    <FloatingLabel label="ФИО">
                        <Form.Control defaultValue={stateRequest.fullName ? stateRequest.fullName : "Не задано"}
                            isInvalid={stateRequest.fullName == null || stateRequest.fullName?.length == 0}
                            placeholder="ФИО" onChange={(t) => 
                                setStateRequest({...stateRequest, fullName: t.target.value})}/>
                        <Form.Control.Feedback type="invalid"> Добавьте ФИО </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel label="Номер телефона">
                        <Form.Control defaultValue={stateRequest.phone? stateRequest.phone : "Не задано"}
                            isInvalid={stateRequest.phone == null || stateRequest.phone?.length == 0}
                            placeholder="Номер телефона" onChange={(t) => 
                                setStateRequest({...stateRequest, phone: t.target.value})}/>    
                        <Form.Control.Feedback type="invalid"> Добавьте номер телефона </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel label="Адрес регистрации">
                        <Form.Control defaultValue={stateRequest.registrationAddress? stateRequest.registrationAddress : "Не задано"}
                            isInvalid={stateRequest.registrationAddress == null || stateRequest.registrationAddress?.length == 0}
                            placeholder="Адрес регистрации" onChange={(t) => 
                                setStateRequest({...stateRequest, registrationAddress: t.target.value})}/>    
                        <Form.Control.Feedback type="invalid"> Добавьте адрес </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel label="Возраст">
                        <Form.Control defaultValue={stateRequest.age? stateRequest.age : "Не задано"} 
                            isInvalid={stateRequest.age != null && stateRequest.age <= 14}
                            type="number" placeholder="Возраст" onChange={(t) => 
                                setStateRequest({...stateRequest, age:
                                    Number(t.target.value) >= 0 ? Number(t.target.value) : null})}/>
                        <Form.Control.Feedback type="invalid"> Возраст должен быть больше 14 лет </Form.Control.Feedback>
                    </FloatingLabel>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => onCreateReader()}> Создать </Button>
                <Button variant="secondary" onClick={() => setShowModal(false)}> Закрыть </Button>       
            </Modal.Footer>
        </Modal>
  );
}