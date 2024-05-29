import { Table } from "react-bootstrap";
import { GetUser } from "../../api/UsersApi";

export default function UsersTable(
    stateResponse: GetUser[], setStateOne: any, setShowModal: React.Dispatch<React.SetStateAction<boolean>>){
    return(
        <Table className="mx-auto" striped hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Почта</th>
                    <th>Логин</th>
                    <th>Телефон</th>
                </tr>
            </thead>
            <tbody>
                {stateResponse?.map((item:GetUser) =>
                    <tr key={item.id} onClick={() => {(
                            setStateOne(item),
                            setShowModal(true)
                        )}}>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.username}</td>
                        <td>{item.phone}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}