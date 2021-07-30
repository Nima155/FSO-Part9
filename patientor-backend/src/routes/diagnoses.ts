import express from "express";
import { fetchAllDiagnoses } from "../services/diagnoses";

export const diagnosesRoute = express.Router();

diagnosesRoute.get("/", (_req, rep) => {
	rep.status(200).json(fetchAllDiagnoses());
});
