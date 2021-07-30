import express from "express";
import cors from "cors";
import { diagnosesRoute } from "./routes/diagnoses";
import { patientsRouter } from "./routes/patients";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/diagnoses", diagnosesRoute);
app.use("/api/patients", patientsRouter);

app.get("/api/ping", (_req, rep) => {
	rep.status(200).send("pong").end();
});

app.use((_req, rep, next) => {
	// middleware for pages that don't exist
	rep.status(404).json({ error: "not found" });
	next();
});

app.listen(3001, () => console.log("listening on port 3001"));
