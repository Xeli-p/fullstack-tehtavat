import patientData from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData;

/*const getNonSentisitvePatients = (): NonSensitivePatient[] => {
  return patients.map(({ ssn, entries, ...rest }) => rest);
}; */

const getPatients = (): NonSensitivePatient[] => {
  return patients
};

const getPatient = (id: string): Patient => {
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    throw new Error('Patient not found');
  }
  return patient;
};

const addPatient = ( newP: NewPatient ): Patient => {

  const id = uuid()
  const newPatient = {
    id: id,
    ...newP,
  };

  patientData.push(newPatient);
  return newPatient;
}

export default {
  getPatients,
  addPatient,
  getPatient
};