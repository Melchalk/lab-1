import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { MyText } from './Components/MyText';
import { GetProductResponse } from './Components/GetProductResponse';
import GetProduct from './Components/GetProduct';

export default function App() {
  const [stateButton, setStateButton] = useState(false);
  const [stateText, setStateText] = useState<string>("");
  const [data, setData] = useState<GetProductResponse[]>();

  useEffect(() =>
  {
    fetch('https://fakestoreapi.com/products?limit=5')
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
        {GetProduct(data)}
      </>
  );
}