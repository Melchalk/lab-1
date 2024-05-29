import { FloatingLabel, Form, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { UpdateProduct, deleteProduct, updateProduct } from '../../api/ProductsApi';

export default function UpdateProductModal(
    stateRequest: UpdateProduct, setStateRequest: any,
    show:boolean, setShowModal: any,
    setShowToast: any, setError: React.Dispatch<any>) {

    const navigate = useNavigate();
    
    const onUpdateProduct = () => {
        updateProduct()
            .then(() =>{
                setShowModal(false);
                navigate('/products');
            })
            .catch((error) => {
                navigate('/products');
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

    const onDeleteProduct = () => {
        deleteProduct(stateRequest.id)
            .then(() => {
                setShowModal(false);
                navigate('/products');
            })
            .catch((error) => {
                navigate('/products');
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
                <Modal.Title>Обновление продукта</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <Stack gap={3} className="mx-auto">
                    <FloatingLabel label="Название">
                        <Form.Control defaultValue={stateRequest.title ? stateRequest.title : "Не задано"}
                            isInvalid={stateRequest.title == null || stateRequest.title?.length == 0}
                            placeholder="Название" onChange={(t) => 
                                setStateRequest({...stateRequest, title: t.target.value})}/>
                    </FloatingLabel>
                    <FloatingLabel label="Категория">
                        <Form.Control defaultValue={stateRequest.category? stateRequest.category : "Не задано"}
                            placeholder="Категория" onChange={(t) => 
                                setStateRequest({...stateRequest, category: t.target.value})}/>    
                    </FloatingLabel>
                    <FloatingLabel label="Описание">
                        <Form.Control defaultValue={stateRequest.description? stateRequest.description : "Не задано"}
                            placeholder="Описание" onChange={(t) => 
                                setStateRequest({...stateRequest, description: t.target.value})}/>    
                    </FloatingLabel>
                    <FloatingLabel label="Стоимость">
                        <Form.Control defaultValue={stateRequest.price? stateRequest.price : "Не задано"} 
                            isInvalid={stateRequest.price != null && stateRequest.price <= 0}
                            type="number" placeholder="Стоимость" onChange={(t) => 
                                setStateRequest({...stateRequest, price:
                                    Number(t.target.value) >= 0 ? Number(t.target.value) : null})}/>
                    </FloatingLabel>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => onUpdateProduct()}> Обновить </Button>
                <Button variant="secondary" onClick={() => setShowModal(false)}> Закрыть </Button>
                <Button variant="danger" onClick={() => onDeleteProduct()}> Удалить </Button>    
            </Modal.Footer>
        </Modal>
  );
}