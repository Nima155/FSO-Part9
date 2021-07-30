import { v1 } from "uuid";
import patients from "../data/patients";
import {
	PatientEntry,
	PublicPatient,
	Patient,
	HealthEntryWithoutId,
	HealthEntry,
} from "../types";

export function getAllPatients(): PublicPatient[] {
	return patients.map(({ dateOfBirth, id, name, gender, occupation }) => {
		return {
			dateOfBirth,
			id,
			name,
			gender,
			occupation,
		};
	});
}

export function getPatientWithId(id: string): Patient | undefined {
	return patients.find((e) => e.id === id);
}

export function addNewPatient(patient: PatientEntry): Patient {
	const newPatient = {
		...patient,
		id: v1(),
	};
	patients.push(newPatient);
	return newPatient;
}

export function addNewEntry(
	params: HealthEntryWithoutId,
	patient: Patient
): Patient {
	const newEntry: HealthEntry = {
		...params,
		id: v1(),
	};
	patient.entries.push(newEntry);
	return patient;
}
