interface ExerciseStats {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}
interface ParsedArguments {
	target: number;
	rest: Array<number>;
}

export function parseArgsCalc([, , target, ...rest]: (
	| string
	| number
)[]): ParsedArguments {
	if (isNaN(+target) || rest.some((e) => isNaN(+e))) {
		throw new Error("All arguments must be numbers");
	}

	if (!target || rest.length === 0) {
		throw new Error("Invalid number of arguments");
	}

	return {
		target: +target,
		rest: rest.map((n) => +n),
	};
}

// rating should be between 1-3
export function calculateExercises(
	exerciseHoursForEachDay: Array<number>,
	targetAverageHour: number
): ExerciseStats {
	const average =
		exerciseHoursForEachDay.reduce((bef, now) => bef + now, 0) /
		exerciseHoursForEachDay.length;
	const ratingAsPercent = (average * 100) / targetAverageHour;
	const rating = ratingAsPercent >= 100 ? 3 : ratingAsPercent >= 70 ? 2 : 1;

	return {
		periodLength: exerciseHoursForEachDay.length,
		trainingDays: exerciseHoursForEachDay.filter((n) => n > 0).length,
		success: average >= targetAverageHour,
		average,
		ratingDescription:
			rating === 3
				? "Awesome"
				: rating === 2
				? "Not bad but could be better"
				: "Terrible",
		rating,
		target: targetAverageHour,
	};
}
try {
	const { rest, target } = parseArgsCalc(process.argv);
	console.log(calculateExercises(rest, target));
} catch (err) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	console.log("An error occured: ", err.message);
}
