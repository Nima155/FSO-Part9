export function parseArgsBmi([, , height, weight, ...rest]: Array<string>) {
	if (rest.length) {
		throw new Error("Too many arguments");
	}
	if (!height || !weight) {
		throw new Error(
			"Missing argument, please provide your height followed by your weight"
		);
	}
	if (isNaN(+height) || isNaN(+weight)) {
		throw new Error("Invalid arguments");
	}

	return {
		height: +height,
		weight: +weight,
	};
}

export function calculateBmi(height: number, weight: number): string {
	if (height <= 0) {
		throw new Error("Invalid height. Height must be above 0");
	}
	const bmi = weight / Math.pow(height / 100, 2);

	if (bmi < 18.5) {
		return "Underweight (Unhealthy weight)";
	}
	if (bmi >= 18.5 && bmi <= 24.9) {
		return "Normal (healthy weight)";
	}
	if (bmi >= 25 && bmi <= 29.9) {
		return "Overweight (Unhealthy weight)";
	}
	if (bmi >= 30) {
		return "Obesity (Extremely unhealthy weight)";
	}
	return "";
}
try {
	const { height, weight } = parseArgsBmi(process.argv);
	console.log(calculateBmi(height, weight));
} catch (err) {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	console.log("An error ocurred: ", err.message);
}
