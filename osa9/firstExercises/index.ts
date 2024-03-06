import qs from 'qs';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import express from 'express';

const app = express();
app.use(express.json());

app.set('query parser',
  (str: string) => qs.parse(str));


app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.post('/exercises', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { daily_exercises, target } = req.body;
        // console.log(daily_exercises)
       // const exerciseDays = daily_exercises as valuesType;
        console.log(daily_exercises);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        if (!daily_exercises || !target ||isNaN(target) || !Array.isArray(daily_exercises) || !daily_exercises.every((a) => typeof a === 'number')) {
            res.type('json');
            const errorMessage = {error: 'malformatted parameters'};
            res.status(400).send(JSON.stringify(errorMessage));
        }
        const exerciseResult = calculateExercises(target, daily_exercises);
        res.type('json');
        res.send(JSON.stringify(exerciseResult));
    } catch (error: unknown) {
        if (error instanceof Error) {
            let errorMessage = 'Something went wrong, ';
            errorMessage += 'Error:' + error.message;
            res.type('json');
            res.status(400).send(JSON.stringify(errorMessage));
        }    
    }
});

app.get('/bmi', (req, res) => {
    try {
      const weight = Number(req.query.weight);
      const height = Number(req.query.height);
  
      if (isNaN(weight) || isNaN(height)) {
        throw new Error('Invalid or missing weight or height parameters');
      }
  
      const bmiResult = calculateBmi(height, weight);
  
      const response = {
        weight,
        height,
        bmi: bmiResult,
      };
  
      res.type('json'); 
      res.send(JSON.stringify(response, null, 2)); 
    } catch (error: unknown) {
        const errorResponse = { error: 'Invalid or missing parameters' };
        res.type('json'); 
        res.status(400).send(JSON.stringify(errorResponse, null, 2));
    }
  });
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});