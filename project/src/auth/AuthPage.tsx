import { Button, FloatingLabel, Form, Nav, Stack, Toast, ToastContainer } from "react-bootstrap";
import { useAppDispatch } from "../redux/hooks";
import { addAuthToken, logout } from "../redux/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorToast from "../components/ErrorToast";
import { LoginRequest, RegisterRequest, loginUser, registerUser } from "./AuthService";

export function LogoutPage() {
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(true);

  const onLogout = () =>{
    dispatch(logout());
  };

  return (
    <>
      <ToastContainer className = "p-3" position='top-end'>
        <Toast show={show} onClose={() => setShow(false)}>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>Successful account logout</Toast.Body>
        </Toast>
      </ToastContainer>
      {onLogout()}
    </>
  );
}

export function LoginPage() {
    const [stateRequest, setStateRequest] = useState<LoginRequest>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [show, setShow] = useState(false);
    const [errorMessage, setError] = useState<any>();

    const onLoginUser = () => {
      loginUser()
        .then((res) =>{
            dispatch(addAuthToken(res.data?.token));

            navigate('/account');
        })
        .catch((error) => {
          setShow(true);
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
      <>
        <Stack gap={3} className="col-md-3 mx-auto mb-3 mt-5">
          <FloatingLabel label="Email">
            <Form.Control placeholder="name@example.com" onChange={(t) => setStateRequest({...stateRequest!, email: t.target.value})}/>
          </FloatingLabel>
          <FloatingLabel label="Password">
            <Form.Control type="password" placeholder="Password" onChange={(t) => setStateRequest({...stateRequest!, password: t.target.value})}/>
          </FloatingLabel>

          <Button variant="primary" className="mx-auto" onClick={() => onLoginUser()}>Войти</Button>
          
          <Nav.Item className="mx-auto">
            <Nav.Link href="/register">Регистрация</Nav.Link>
          </Nav.Item>
        </Stack>
      
        {ErrorToast(show, setShow, errorMessage)}
      </>
    );
}

export function RegisterPage() {
  const [stateRequest, setStateRequest] = useState<RegisterRequest>();

  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  
  const [show, setShow] = useState(false);
  const [errorMessage, setError] = useState<any>();

  const onRegisterUser = () => {
    registerUser()
      .then((res) =>{
          dispatch(addAuthToken(res.data?.token));

          navigate('/account');
      })
      .catch((error) => {
        setShow(true);
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
    <>
      <Stack gap={3} className="col-md-3 mx-auto mb-3 mt-5">
        <FloatingLabel label="Name">
          <Form.Control placeholder="Name" onChange={(t) => setStateRequest({...stateRequest!, name: t.target.value})}/>
        </FloatingLabel>
        <FloatingLabel label="Email">
          <Form.Control placeholder="name@example.com" onChange={(t) =>  setStateRequest({...stateRequest!, email: t.target.value})}/>
        </FloatingLabel>
        <FloatingLabel label="Password">
          <Form.Control type="password" placeholder="Password" onChange={(t) => setStateRequest({...stateRequest!, password: t.target.value})}/>
        </FloatingLabel>

        <Button variant="primary" className="mx-auto"  onClick={() => onRegisterUser()}>Зарегистрироваться</Button>
        
        <Nav.Item className="mx-auto">
          <Nav.Link href="/auth">Вход</Nav.Link>
        </Nav.Item>
      </Stack>

      {ErrorToast(show, setShow, errorMessage)}
    </>
  );
}