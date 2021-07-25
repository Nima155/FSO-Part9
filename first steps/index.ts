import { calculateBmi, parseArgsBmi } from "./bmiCalculator";
import { calculateExercises, parseArgsCalc } from "./exerciseCalculator";
import express = require("express");

const app = express();
app.use(express.json());

app.get("/hello", (_req: express.Request, res: express.Response) => {
	res.send("Hello Full Stack");
});

app.get("/bmi", (req, rep) => {
	// we access potential queries through req.query
	const q = req.query; // queries look like this http://localhost:3002/bmi?height=180&weight=72
	try {
		const { height, weight } = parseArgsBmi([
			"",
			"",
			q.height ? q.height.toString() : "",
			q.weight ? q.weight.toString() : "",
		]);
		const res = calculateBmi(height, weight);
		rep.status(200).json({
			weight: req.query.weight,
			height: req.query.height,
			bmi: res,
		});
	} catch (err) {
		rep.status(400).json({ error: "malformatted parameters" });
	}
});
interface BodyType {
	target: number | string;
	daily_exercises: (number | string)[];
}
// not exactly bullet proof in terms of error handling..
app.post("/exercises", (req, rep) => {
	const body = <BodyType>req.body; // <BodyType> is casting

	try {
		if (
			!Array.isArray(body.daily_exercises) &&
			typeof body.daily_exercises !== "string" // this extra layer of error handling is crucial ... as spreading an object returns []
		) {
			throw new Error("");
		}
		const { target, rest } = parseArgsCalc([
			"",
			"",
			body.target,
			...body.daily_exercises,
		]);
		rep.status(200).json(calculateExercises(rest, target));
	} catch (error) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		const msg: string = error.message;
		rep.status(400).json({
			error: msg.includes("Invalid")
				? "parameters missing"
				: "malformatted parameters",
		});
	}
});

app.listen(3003, () => console.log("started listening on port 3003"));
