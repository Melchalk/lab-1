import { Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { GetIssueResponse, deleteIssue, } from '../../api/IssueApi';

export default function DeleteIssueModal(
    stateResponse: GetIssueResponse,
    show:boolean, setShowModal: any,
    setShowToast: any, setError: React.Dispatch<any>) {

    const navigate = useNavigate();

    const onDeleteIssue = () => {
        deleteIssue(stateResponse.id)
            .then(() => {
                setShowModal(false);
                navigate('/issues');
            })
            .catch((error) => {
                navigate('/issues');
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
                <Modal.Title>Информация о выдаче</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <Stack>
                    <h5>Id выдачи</h5>
                    <h6>{stateResponse.id}</h6>
                    <h5>Id читателя</h5>
                    <h6>{stateResponse.readerId}</h6>
                    <h5>Дата возврата</h5>
                    <h6>{new Date(stateResponse.returnDate).toLocaleString()}</h6>
                    <h5> Id книг </h5>
                    {stateResponse.booksId?.map((item:string) => <h6>{item}</h6>)}
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={() => onDeleteIssue()}> Удалить </Button>    
                <Button variant="secondary" onClick={() => setShowModal(false)}> Закрыть </Button>
            </Modal.Footer>
        </Modal>
  );
}