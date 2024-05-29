import { Table } from "react-bootstrap";
import { GetCart } from "../../api/CartsApi";

export default function CartsTable(
    stateResponse: GetCart[],
    setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>,
    setStateUpdateRequest: any){
    return(
        <Table className="mx-auto" striped hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Id пользователя</th>
                    <th>Дата</th>
                </tr>
            </thead>
            <tbody>
                {stateResponse?.map((item:GetCart) =>
                    <tr key={item.id} onClick={() => {(
                            setStateUpdateRequest(item),
                            setShowUpdateModal(true)
                        )}}>
                        <td>{item.id}</td>
                        <td>{item.userId}</td>
                        <td>{item.date}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}