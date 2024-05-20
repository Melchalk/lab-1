import { useEffect, useState } from "react";
import { MyText } from "../Components/MyText";
import { Button } from "react-bootstrap";
import GetProduct from "../Components/GetProduct";
import { GetProductResponse } from "../Components/GetProductResponse";

export default function HomePage() {
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
        <Button variant="warning" onClick={() =>{ setStateButton(!stateButton) }}>My Button</Button>
        <br />
        {GetProduct(data)}
      </>
  );
}