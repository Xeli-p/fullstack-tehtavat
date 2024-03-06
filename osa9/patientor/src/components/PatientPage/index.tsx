import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../../types";

interface Props {
    patients: Patient[];
    diagnoses: Diagnosis[];
}

const PatientPage = ({patients, diagnoses}: Props) => {

    const id = useParams().id
    const patient = patients.find(n => n.id === id)

    if(!patient) return(<div>No patient found</div>)

    return(
        <div>
            <h2>{patient.name}</h2>
            <p>{patient.gender}</p>
            <p>date of birth: {patient.dateOfBirth}</p>
            <p>id: {patient.id}</p>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <h3>entries</h3>
            {patient.entries.map((d, index )=> (
                <div key={index}>
                   <p>{d.date} {d.description}</p>
                   <ul>
                        {d.diagnosisCodes?.map((c, index) => (
                            <li key={index}>
                                {c} {diagnoses && diagnoses.find((d) => d.code === c)?.name}
                            </li>
                        ))}
                    </ul> 
                </div>
            ))}
        </div>
    )
}

export default PatientPage