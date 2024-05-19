import { GetFacultyResponse } from './GetFacultyResponse';

export default function GetFaculty(data:GetFacultyResponse[] | undefined)
{
    return (
        <>
            {data?.map((item:GetFacultyResponse) =>
                <li key={item.number}>
                <h3>Number of faculty: {item.number}</h3>
                <h3>Name of faculty: {item.name}</h3>
                <br />
                </li>
            )}
        </>
    );
}