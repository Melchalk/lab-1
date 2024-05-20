import Form from "react-bootstrap/Form";

export function MyText(state:string, fun:React.Dispatch<React.SetStateAction<string>>)
{
    console.log(state);

    return (
        <>
            <Form.Control size="lg" type="text" placeholder="Large text" onChange={(t) => fun(t.target.value)}/>
            <br />
            <Form.Control type="text" placeholder="Normal text" />
            <br />
            <Form.Control size="sm" type="text" placeholder="Small text" />
        </>
    );
}
