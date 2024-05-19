import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { MyText } from './Components/MyText';
import { GetFacultyResponse } from './Components/GetFacultyResponse';
import GetFaculty from './Components/GetFaculty';

export default function App() {
  const [stateButton, setStateButton] = useState(false);
  const [stateText, setStateText] = useState<string>("");
  const [data, setData] = useState<GetFacultyResponse[]>();

  useEffect(() =>
  {
    fetch("http://localhost:5084/api/faculty/get/all")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => console.log('error sync'))
  }, []);

  console.log(stateButton);

  return (
      <>
        {MyText(stateText, setStateText)}
        <br />
        <Button variant="warning" onClick={() =>
          {
            setStateButton(!stateButton)
          }}
          >My Button</Button>
        <br />
        {GetFaculty(data)}
      </>
  );
}