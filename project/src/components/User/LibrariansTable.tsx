import { Table } from "react-bootstrap";
import { GetLibrarianResponse } from "../../api/LibrarianApi";

export default function LibrariansTable(stateResponse: GetLibrarianResponse[]){
    return(
        <Table className="mx-auto" striped hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Номер библиотеки</th>
                    <th>Полное имя</th>
                    <th>Номер телефона</th>
                </tr>
            </thead>
            <tbody>
                {stateResponse?.map((item:GetLibrarianResponse) =>
                    <tr key={item.id} >
                        <td>{item.id}</td>
                        <td>{item.libraryNumber}</td>
                        <td>{item.fullName}</td>
                        <td>{item.phone}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}