export interface bmiValues {
    value1: number,
    value2: number
}

export const parseHeightAndLength = (args: string[]): bmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
          value1: Number(args[2]),
          value2: Number(args[3])
        };
      } else {
        throw new Error('Provided values were not numbers!');
      }
};

export const calculateBmi = (a: number, b: number): string => {
    const bmi = ((b) / ((a / 100)^2));
    console.log('bmi:' + bmi);
    if (bmi < 18.5) return `Underweight (unhealthy)`;
    if (bmi < 25) return `Normal (healthy weight)`;
    if (bmi < 30) return `Overweight (unhealthy)`;
    if (bmi >= 30) return `Overweight (unhealthy)`;

    return `something went wrong`;
};

try {
    const { value1, value2 } = parseHeightAndLength(process.argv);
    console.log(calculateBmi(value1, value2));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

//console.log(calculateBmi(180,74));