export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis["code"]>;
}
export enum HealthEntryTypes {
	HealthCheck = "HealthCheck",
	OccupationalHealthcare = "OccupationalHealthcare",
	Hospital = "Hospital",
}
export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3,
}
interface HealthCheckEntry extends BaseEntry {
	type: HealthEntryTypes.HealthCheck;
	healthCheckRating: HealthCheckRating;
}
export interface OccupationalHealthCareEntry extends BaseEntry {
	type: HealthEntryTypes.OccupationalHealthcare;
	employerName: string;
	sickLeave?: { startDate: string; endDate: string };
}

interface HospitalEntry extends BaseEntry {
	type: HealthEntryTypes.Hospital;
	discharge: { date: string; criteria: string };
}

export type HealthEntry =
	| HospitalEntry
	| OccupationalHealthCareEntry
	| HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
	? Omit<T, K>
	: never;

export type HealthEntryWithoutId = UnionOmit<HealthEntry, "id">; // using the custom UnionOmit

export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other",
}

export interface Patient {
	id: string;
	name: string;
	occupation: string;
	gender: Gender;
	ssn?: string;
	dateOfBirth?: string;
	entries?: HealthEntry[];
}
