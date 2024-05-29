import { FloatingLabel, Form, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { CreateUser, createUser } from '../../api/UsersApi';

export default function CreateUserModal(
    stateRequest: CreateUser, setStateRequest: any,
    show:boolean, setShowModal: any,
    setShowToast: any, setError: React.Dispatch<any>) {

    const navigate = useNavigate();

    const onCreateUser = () => {
        createUser()
            .then(() =>{
                setShowModal(false);
                navigate('/users');
            })
            .catch((error) => {
                navigate('/users');
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
                <Modal.Title>Добавление пользователя</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <Stack gap={3} className="mx-auto">
                    <FloatingLabel label="Email">
                        <Form.Control defaultValue={stateRequest.email ? stateRequest.email : "Не задано"}
                            isInvalid={stateRequest.email == null || stateRequest.email?.length == 0}
                            placeholder="Email" onChange={(t) => 
                                setStateRequest({...stateRequest, email: t.target.value})}/>
                        <Form.Control.Feedback type="invalid"> Добавьте email </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel label="Логин">
                        <Form.Control defaultValue={stateRequest.username ? stateRequest.username : "Не задано"}
                            isInvalid={stateRequest.username == null || stateRequest.username?.length == 0}
                            placeholder="Логин" onChange={(t) => 
                                setStateRequest({...stateRequest, username: t.target.value})}/>
                        <Form.Control.Feedback type="invalid"> Добавьте логин </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel label="Телефон">
                        <Form.Control defaultValue={stateRequest.phone ? stateRequest.phone : "Не задано"}
                            isInvalid={stateRequest.phone == null || stateRequest.phone?.length == 0}
                            placeholder="Телефон" onChange={(t) => 
                                setStateRequest({...stateRequest, phone: t.target.value})}/>
                        <Form.Control.Feedback type="invalid"> Добавьте телефон </Form.Control.Feedback>
                    </FloatingLabel>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => onCreateUser()}> Создать </Button>
                <Button variant="secondary" onClick={() => setShowModal(false)}> Закрыть </Button>
            </Modal.Footer>
        </Modal>
  );
}