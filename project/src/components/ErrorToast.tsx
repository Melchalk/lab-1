import { ToastContainer } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';

export default function ErrorToast(show: boolean, setShow: React.Dispatch<React.SetStateAction<boolean>>, errorMessage:any) {
  return (
    <ToastContainer className = "p-3" position='top-end'>
        <Toast show={show} onClose={() => setShow(false)}>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{errorMessage}</Toast.Body>
        </Toast>
    </ToastContainer>
  );
}