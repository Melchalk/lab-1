import { FloatingLabel, Form, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { CreateCart, createCart } from '../../api/CartsApi';

export default function CreateCartModal(
    stateRequest: CreateCart, setStateRequest: any,
    show:boolean, setShowModal: any,
    setShowToast: any, setError: React.Dispatch<any>) {

    const navigate = useNavigate();
    
    const onCreateCart = () => {
        createCart()
            .then(() =>{
                setShowModal(false);
                navigate('/carts');
            })
            .catch((error) => {
                navigate('/carts');
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
                    <FloatingLabel label="Id пользователя">
                        <Form.Control defaultValue={stateRequest.userId? stateRequest.userId : "Не задано"} 
                            isInvalid={stateRequest.userId <= 0}
                            type="number" placeholder="Id пользователя" onChange={(t) => 
                                setStateRequest({...stateRequest, userId:
                                    Number(t.target.value) >= 0  ? Number(t.target.value) : stateRequest.userId})}/>
                        <Form.Control.Feedback type="invalid"> Id пользователя должно быть больше 0 </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel label="Дата">
                        <Form.Control  defaultValue={stateRequest.date? stateRequest.date : "Не задано"} 
                            isInvalid={stateRequest.date == null} placeholder="Дата" onChange={(t) => 
                                setStateRequest({...stateRequest, date:
                                    Number(t.target.value) >= 0 ? t.target.value : stateRequest.date})}/>
                        <Form.Control.Feedback type="invalid"> Дата не должна быть пустая </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel label="Город">
                        <Form.Control defaultValue={stateRequest.cityPublishing? stateRequest.cityPublishing : "Не задано"}
                            placeholder="Город" onChange={(t) => 
                                setStateRequest({...stateRequest, cityPublishing: t.target.value})}/>    
                    </FloatingLabel>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => onCreateCart()}> Создать </Button>
                <Button variant="secondary" onClick={() => setShowModal(false)}> Закрыть </Button>
            </Modal.Footer>
        </Modal>
  );
}