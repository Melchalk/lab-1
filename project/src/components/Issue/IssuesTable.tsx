import { Table } from "react-bootstrap";
import { GetIssueResponse } from "../../api/IssueApi";

export default function IssuesTable(
    stateResponse: GetIssueResponse[], setStateOne: any, setShowModal: React.Dispatch<React.SetStateAction<boolean>>){
    return(
        <Table className="mx-auto" striped hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Id читателя</th>
                    <th>Дата возврата</th>
                </tr>
            </thead>
            <tbody>
                {stateResponse?.map((item:GetIssueResponse) =>
                    <tr key={item.id} onClick={() => {(
                            setStateOne(item),
                            setShowModal(true)
                        )}}>
                        <td>{item.id}</td>
                        <td>{item.readerId}</td>
                        <td>{new Date(item.returnDate).toLocaleString()}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}