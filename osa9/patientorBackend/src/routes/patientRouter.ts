import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  const patients = patientService.getPatients()
  res.type('json')
  res.status(200).send(JSON.stringify(patients, null, 2));
});

patientRouter.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id)
  res.type('json')
  res.status(200).send(JSON.stringify(patient, null, 2));
})

patientRouter.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientRouter;