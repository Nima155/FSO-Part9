import express from "express";
import {
	addNewEntry,
	addNewPatient,
	getAllPatients,
	getPatientWithId,
} from "../services/patients";

import toNewPatient from "../utils/patientParser";
import toNewEntry from "../utils/entryParser";

export const patientsRouter = express.Router();

patientsRouter.get("/", (_req, rep) => {
	rep.status(200).json(getAllPatients());
});
patientsRouter.get("/:id", (req, rep) => {
	const patient = getPatientWithId(req.params.id);
	if (patient) {
		rep.json(patient);
	} else
		rep
			.status(404)
			.json({ error: "Could not find a patient with the give ID" });
});

patientsRouter.post("/", (req, rep) => {
	try {
		const newPatient = toNewPatient(req.body);
		const addedPatient = addNewPatient(newPatient);
		rep.json(addedPatient);
	} catch (err) {
		rep.status(400).send(err.message);
	}
});
patientsRouter.post("/:id/entries", (req, rep) => {
	try {
		const patient = getPatientWithId(req.params.id);
		if (!patient) throw new Error("Invalid user");
		const newEntry = toNewEntry(req.body);
		const patientWithNewEntry = addNewEntry(newEntry, patient); // TODO: maybe don't return the patient. But we can argue that
		// this is better at least for the frontend
		rep.json(patientWithNewEntry);
	} catch (err) {
		rep.status(400).send(err.message);
	}
});
