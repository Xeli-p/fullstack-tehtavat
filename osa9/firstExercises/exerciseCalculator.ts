interface result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface values {
    target: number,
    values: number[]
}

// export type DaysType = number[];

const parseArguments = (args: string[]): values => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const target = Number(args[2]);
    if (isNaN(target)){
        throw new Error('Target not a number');
    }
    const values = args.slice(3).map((arg) => {
        const workout = Number(arg);
        if (isNaN(workout)) {
            throw new Error('workout day was not a number');
        }
        return workout;
    });
    return {
        target: target,
        values: values
    };

};

export const calculateExercises = (c: number, a: Array<number>) : result => {

    const periodLength = a.length;
    const trainingDays = a.filter(b => b != 0).length;
    const sum = a.reduce((acc, curr) => acc + curr, 0);
    const avg = sum / a.length;
    console.log('avg:' + avg);
    let success = false;
    if (avg >= c) success = true;
    const diff = avg - c;
    let rating = 0;
    let ratingDescription = ``;
    console.log('diff:' + diff);
    switch (true) {
        case diff < 0 :
            rating = 1;
            ratingDescription = `failure`;
            break;
        case diff < 0.5 :
            rating = 2;
            ratingDescription = `pretty good`;
            break;
        case diff >= 0.5 : 
            rating = 3;
            ratingDescription = `very good`;
            break;
    }
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: c,
        average: avg
    };
};

try {
    const {target, values} = parseArguments(process.argv);
    console.log(calculateExercises(target, values));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

// console.log(calculateExercises([2,0,3,2,0,1,0], 2))