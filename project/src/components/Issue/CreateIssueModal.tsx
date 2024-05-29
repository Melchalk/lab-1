import { FloatingLabel, Form, Stack } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { CreateIssueRequest, createIssue } from '../../api/IssueApi';
import { GetBookResponse } from '../../api/BookApi';

export default function CreateIssueModal(
    stateBookResponse: GetBookResponse[],
    stateRequest: CreateIssueRequest, setStateRequest: any,
    show:boolean, setShowModal: any,
    setShowToast: any, setError: React.Dispatch<any>) {

    const navigate = useNavigate();

    const onCreateIssue = () => {
        createIssue(stateRequest)
            .then(() =>{
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
                <Modal.Title>Добавление книги</Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <Stack gap={3} className="mx-auto">
                    <FloatingLabel label="Id читателя">
                        <Form.Control defaultValue={stateRequest.readerId ? stateRequest.readerId : "Не задано"}
                            isInvalid={stateRequest.readerId == null || stateRequest.readerId?.length == 0}
                            placeholder="Id читателя" onChange={(t) => 
                                setStateRequest({...stateRequest, readerId: t.target.value})}/>
                        <Form.Control.Feedback type="invalid"> Добавьте Id читателя </Form.Control.Feedback>
                    </FloatingLabel>
                    <FloatingLabel label="Период">
                        <Form.Control defaultValue={stateRequest.period? stateRequest.period : "Не задано"} 
                            isInvalid={stateRequest.period <= 0}
                            type="number" placeholder="Период" onChange={(t) => 
                                setStateRequest({...stateRequest, period:
                                    Number(t.target.value) >= 0  ? Number(t.target.value) : stateRequest.period})}/>
                        <Form.Control.Feedback type="invalid"> Период должен быть положительным </Form.Control.Feedback>
                    </FloatingLabel>
                        <Form.Select isInvalid={stateRequest.booksId == null} multiple
                        onChange={(value) => setStateRequest({...stateRequest, booksId: [value.target.value]})} >
                            {stateBookResponse?.map((item:GetBookResponse) => <option key={item.id} value={item.id}>{item.title}</option>)}
                        </Form.Select>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => onCreateIssue()}> Создать </Button>
                <Button variant="secondary" onClick={() => setShowModal(false)}> Закрыть </Button>
            </Modal.Footer>
        </Modal>
  );
}