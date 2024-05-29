import { Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { GetUser, deleteUser, } from '../../api/UsersApi';

export default function DeleteUserModal(
    stateResponse: GetUser,
    show:boolean, setShowModal: any,
    setShowToast: any, setError: React.Dispatch<any>) {

    const navigate = useNavigate();

    const onDeleteUser = () => {
        deleteUser(stateResponse.id)
            .then(() => {
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
                <Modal.Title>Информация о пользователе</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <Stack>
                    <h5>Id выдачи</h5>
                    <h6>{stateResponse.id}</h6>
                    <h5>Почта</h5>
                    <h6>{stateResponse.email}</h6>
                    <h5>Логин</h5>
                    <h6>{stateResponse.username}</h6>
                    <h5>Телефон</h5>
                    <h6>{stateResponse.phone}</h6>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => onDeleteUser()}> Удалить </Button>    
                <Button variant="secondary" onClick={() => setShowModal(false)}> Закрыть </Button>
            </Modal.Footer>
        </Modal>
  );
}