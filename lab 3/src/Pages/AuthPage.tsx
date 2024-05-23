import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useAppDispatch } from "../redux/hooks";
import { useState } from "react";
import { LoginRequest, RegisterRequest, loginUser, registerUser } from "../Api/AuthApi";
import { addToken } from "../redux/loginSlice";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
    const [stateRequest, setStateRequest] = useState<LoginRequest>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const login = () => {
      loginUser(stateRequest!)
        .then((res) =>{
            dispatch(addToken(res.data?.token));
            navigate('/home');
        })
    };

    return (
      <>
        <FloatingLabel label="Email" className="col-md-2 mx-auto mt-5">
          <Form.Control placeholder="name@example.com" onChange={(t) => setStateRequest({...stateRequest!, email: t.target.value})}/>
        </FloatingLabel>
        <FloatingLabel label="Password" className="col-md-2 mx-auto mt-2">
          <Form.Control type="password" placeholder="Password" onChange={(t) => setStateRequest({...stateRequest!, password: t.target.value})}/>
        </FloatingLabel>
        <br />
        <Button className="d-grid col-1 mx-auto" onClick={() => login()}>Ok</Button>
      </>
    );
}

export function RegisterPage() {
  const [stateRequest, setStateRequest] = useState<RegisterRequest>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const register = () => {
    registerUser(stateRequest!)
      .then((res) =>{
          dispatch(addToken(res.data?.token));
          navigate('/main');
      })
  };

  return (
    <>
      <FloatingLabel label="Name" className="col-md-2 mx-auto mt-5">
        <Form.Control placeholder="Name" onChange={(t) => setStateRequest({...stateRequest!, name: t.target.value})}/>
      </FloatingLabel>
      <FloatingLabel label="Email" className="col-md-2 mx-auto mt-2">
        <Form.Control placeholder="name@example.com" onChange={(t) =>  setStateRequest({...stateRequest!, email: t.target.value})}/>
      </FloatingLabel>
      <FloatingLabel label="Password" className="col-md-2 mx-auto mt-2">
        <Form.Control type="password" placeholder="Password" onChange={(t) => setStateRequest({...stateRequest!, password: t.target.value})}/>
      </FloatingLabel>
      <br />
      <Button className="d-grid col-1 mx-auto" onClick={() => register()}>Ok</Button>
    </>
  );
}