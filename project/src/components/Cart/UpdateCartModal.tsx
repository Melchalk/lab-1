import { FloatingLabel, Form, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { UpdateCart, deleteCart, updateCart } from '../../api/CartsApi';
import { GetProduct } from '../../api/ProductsApi';

export default function UpdateCartModal(
    stateProductResponse: any,
    stateRequest: UpdateCart, setStateRequest: any,
    show:boolean, setShowModal: any,
    setShowToast: any, setError: React.Dispatch<any>) {

    const navigate = useNavigate();
    
    const onUpdateCart = () => {
        updateCart(stateRequest)
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

    const onDeleteCart = () => {
        deleteCart(stateRequest.id)
            .then(() => {
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
                <Modal.Title>Обновление корзины</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <Stack gap={3} className="mx-auto">
                    <FloatingLabel label="Id пользователя">
                        <Form.Control defaultValue={stateRequest.userId? stateRequest.userId : "Не задано"} 
                            isInvalid={stateRequest.userId != null && stateRequest.userId <= 0}
                            type="number" placeholder="Id пользователя" onChange={(t) => 
                                setStateRequest({...stateRequest, userId:
                                !isNaN(Number(t.target.value)) ? Number(t.target.value) : null})}/>
                        <Form.Control.Feedback type="invalid"> Id пользователя должно быть больше 0 </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel label="Дата">
                        <Form.Control  defaultValue={stateRequest.date? new Date(stateRequest.date).toLocaleString() : "Не задано"} 
                            isInvalid={stateRequest.date == null ||  stateRequest.date.length == 0} placeholder="Дата" onChange={(t) => 
                                setStateRequest({...stateRequest, date: t.target.value})}/>
                        <Form.Control.Feedback type="invalid"> Дата не должна быть пустая </Form.Control.Feedback>
                    </FloatingLabel>
                    <Form.Select isInvalid={stateRequest.products == null} multiple
                        onChange={(value) => setStateRequest({...stateRequest, products: [value.target.value]})} >
                            {stateProductResponse?.map((item:GetProduct) => <option key={item.id} value={item.id}>{item.title}</option>)}
                    </Form.Select>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => onUpdateCart()}> Обновить </Button>
                <Button variant="secondary" onClick={() => setShowModal(false)}> Закрыть </Button>
                <Button variant="danger" onClick={() => onDeleteCart()}> Удалить </Button>    
            </Modal.Footer>
        </Modal>
  );
}