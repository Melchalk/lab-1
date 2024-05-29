import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { deleteCurrentUser } from '../../auth/AuthService';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/authSlice';

export default function DeletePersonModal(
    show:boolean, setShowModal: any,
    setShowToast: any, setError: React.Dispatch<any>) {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const onDeleteUser = () => {
        deleteCurrentUser()
            .then(() => {
                dispatch(logout());
                navigate('/home');
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
                <Modal.Title>Удаление аккаунта</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6>Вы уверены, что хотите удалить аккаунт?</h6>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => onDeleteUser()}> Удалить </Button>
                <Button variant="secondary" onClick={() => setShowModal(false)}> Закрыть </Button>
            </Modal.Footer>
        </Modal>
  );
}