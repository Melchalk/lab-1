import { Table } from "react-bootstrap";
import { GetProduct } from "../../api/ProductsApi";

export default function ProductsTable(
    stateResponse: GetProduct[],
    setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>,
    setStateUpdateRequest: any){
    return(
        <Table className="mx-auto" striped hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Название</th>
                    <th>Стоимость</th>
                    <th>Категория</th>
                    <th>Описание</th>
                </tr>
            </thead>
            <tbody>
                {stateResponse?.map((item:GetProduct) =>
                    <tr key={item.id} onClick={() => {(
                            setStateUpdateRequest(item),
                            setShowUpdateModal(true)
                        )}}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td>{item.category}</td>
                        <td>{item.description}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}