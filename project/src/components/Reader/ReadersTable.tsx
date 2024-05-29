import { Table } from "react-bootstrap";
import { GetReaderResponse, UpdateReaderRequest } from "../../api/ReaderApi";

export default function ReadersTable(
    stateResponse: GetReaderResponse[],
    setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>,
    setStateUpdateRequest: React.Dispatch<React.SetStateAction<UpdateReaderRequest>>){
    return(
        <Table className="mx-auto" striped hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Полное имя</th>
                    <th>Номер телефона</th>
                    <th>Адрес регистрации</th>
                    <th>Возраст</th>
                    <th>Разрешение на взятие книг</th>
                    <th>Номер выдачи</th>
                </tr>
            </thead>
            <tbody>
                {stateResponse?.map((item:GetReaderResponse) =>
                    <tr key={item.id} onClick={() => {(
                            setStateUpdateRequest(item),
                            setShowUpdateModal(true)
                        )}}>
                        <td>{item.id}</td>
                        <td>{item.fullName}</td>
                        <td>{item.phone}</td>
                        <td>{item.registrationAddress != null ? item.registrationAddress : "Неизвестно"}</td>
                        <td>{item.age}</td>
                        <td>{item.canTakeBooks ? "Разрешено" : "Запрещено"}</td>
                        <td>{item.issueId != null ? item.issueId : "Выдач нет"}</td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}