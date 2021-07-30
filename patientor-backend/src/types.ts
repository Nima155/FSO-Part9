// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface Diagnose {
	code: string;
	name: string;
	latin?: string;
}

interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	gender: Gender;
	occupation: string;
	ssn: string;
	entries: HealthEntry[];
}

export enum Gender {
	male = "male",
	female = "female",
	other = "other",
}

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnose["code"]>;
}
export type BaseEntryWithoutId = Omit<BaseEntry, "id">;
export enum HealthEntryTypes {
	HealthCheck = "HealthCheck",
	OccupationalHealthcare = "OccupationalHealthcare",
	Hospital = "Hospital",
}
export type SickLeave = { startDate: string; endDate: string };

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
interface OccupationalHealthCareEntry extends BaseEntry {
	type: HealthEntryTypes.OccupationalHealthcare;
	employerName: string;
	sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
	type: HealthEntryTypes.Hospital;
	discharge: { date: string; criteria: string };
}

type PublicPatient = Omit<Patient, "ssn" | "entries">; // utility type omit.. get rid of ssn

type PatientEntry = Omit<Patient, "id">; // get rid of id

type HealthEntry =
	| HospitalEntry
	| OccupationalHealthCareEntry
	| HealthCheckEntry;
// special UnionOmit... read here: https://github.com/microsoft/TypeScript/issues/42680 and
// also https://web.archive.org/web/20210202081915/https://medium.com/swlh/typescript-generic-types-and-how-to-properly-implement-them-498519a8ab65
// by default Omit is implemented sort of like this: Omit<T, K extends keyOf T> => meaning K is a member of T. But if K is not a member of T, then there will
// be no change
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
	? Omit<T, K>
	: never;

type HealthEntryWithoutId = UnionOmit<HealthEntry, "id">; // using the custom UnionOmit
export {
	PublicPatient,
	Patient,
	PatientEntry,
	HealthEntry,
	HealthEntryWithoutId,
};
