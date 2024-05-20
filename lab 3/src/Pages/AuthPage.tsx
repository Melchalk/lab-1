import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useAppDispatch } from "../redux/hooks";
import { useState } from "react";
import { LoginRequest, RegisterRequest, loginUser, registerUser } from "../Api/AuthApi";
import { addToken } from "../redux/loginSlice";

export function LoginPage() {
    const [stateRequest, setStateRequest] = useState<LoginRequest>();
    const dispatch = useAppDispatch();

    const login = () => {
      loginUser(stateRequest!)
        .then((res) =>{
            dispatch(addToken(res.data?.token));
        })
    };

    return (
      <>
        <FloatingLabel label="Email" className="mb-3">
          <Form.Control placeholder="name@example.com" onChange={(t) => setStateRequest({...stateRequest!, email: t.target.value})}/>
        </FloatingLabel>
        <FloatingLabel label="Password">
          <Form.Control type="password" placeholder="Password" onChange={(t) => setStateRequest({...stateRequest!, password: t.target.value})}/>
        </FloatingLabel>
        <br />
        <Button onClick={() => login()}>Ok</Button>
      </>
    );
}

export function RegisterPage() {
  const [stateRequest, setStateRequest] = useState<RegisterRequest>();

  const dispatch = useAppDispatch();

  const register = () => {
    registerUser(stateRequest!)
      .then((res) =>{
          dispatch(addToken(res.data?.accessToken));
      })
  };

  return (
    <>
      <FloatingLabel label="Name" className="mb-3">
        <Form.Control placeholder="Name" onChange={(t) => setStateRequest({...stateRequest!, name: t.target.value})}/>
      </FloatingLabel>
      <FloatingLabel label="Email" className="mb-3">
        <Form.Control placeholder="name@example.com" onChange={(t) =>  setStateRequest({...stateRequest!, email: t.target.value})}/>
      </FloatingLabel>
      <FloatingLabel label="Password">
        <Form.Control type="password" placeholder="Password" onChange={(t) => setStateRequest({...stateRequest!, password: t.target.value})}/>
      </FloatingLabel>
      <br />
      <Button onClick={() => register()}>Ok</Button>
    </>
  );
}