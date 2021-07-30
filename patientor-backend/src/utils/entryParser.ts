import {
	Diagnose,
	HealthEntryWithoutId,
	HealthEntryTypes,
	SickLeave,
	HealthCheckRating,
	BaseEntryWithoutId,
} from "../types";
import diagnoses from "../data/diagnoses.json";
import {
	parseType,
	parseString,
	isString,
	isDate,
	parseDate,
} from "./genericParsers";

function assertNever(_params: never): never {
	throw new Error("Unhandled healthEntry type");
}

function isDiagnosisCodesArray(
	param: unknown
): param is Array<Diagnose["code"]> {
	return (
		Array.isArray(param) &&
		param.every((e) => isString(e) && diagnoses.find((x) => x.code === e))
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isLeave(param: any): param is SickLeave {
	return Boolean(
		typeof param === "object" &&
			param.startDate &&
			isDate(param.startDate) &&
			param.endDate &&
			isDate(param.endDate) &&
			Date.parse(param.startDate) < Date.parse(param.endDate)
	);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isDischage(param: any): param is { date: string; criteria: string } {
	return Boolean(
		typeof param === "object" &&
			param.date &&
			isDate(param.date) &&
			param.criteria &&
			isString(param.criteria)
	);
}
function parseDiagnosisCode(
	codes: unknown
): Array<Diagnose["code"]> | undefined {
	if (!codes) return;
	if (!isDiagnosisCodesArray(codes)) throw new Error("Invalid diagnosis codes");

	return codes;
}

function parseLeave(param: unknown): SickLeave | undefined {
	if (!param) return undefined;

	if (!isLeave(param)) throw new Error("Invalid sick leave format");

	return param;
}

function parseDischarge(params: unknown): { date: string; criteria: string } {
	if (!params || !isDischage(params))
		throw new Error("Invalid discharge format");

	return params;
}

interface Field {
	description: unknown;
	date: unknown;
	specialist: unknown;
	diagnosisCodes?: unknown;
	type: unknown;
	healthCheckRating?: unknown;
	sickLeave?: unknown;
	discharge?: unknown;
	employerName?: unknown;
}

export default function toNewEntry({
	description,
	date,
	specialist,
	diagnosisCodes,
	type,
	healthCheckRating,
	sickLeave,
	discharge,
	employerName,
}: Field): HealthEntryWithoutId {
	const typeOfEntry = parseType(HealthEntryTypes, type);
	const diagnosisCodes1 = parseDiagnosisCode(diagnosisCodes);
	const intermediateObject: BaseEntryWithoutId = {
		...(diagnosisCodes1 && { diagnosisCodes: diagnosisCodes1 }),
		date: parseDate(date),
		specialist: parseString(specialist),
		description: parseString(description),
	};

	switch (typeOfEntry) {
		case HealthEntryTypes.HealthCheck:
			return {
				...intermediateObject,
				type: HealthEntryTypes.HealthCheck,
				healthCheckRating: parseType(HealthCheckRating, healthCheckRating),
			};
		case HealthEntryTypes.Hospital:
			return {
				...intermediateObject,
				type: HealthEntryTypes.Hospital,
				discharge: parseDischarge(discharge),
			};
		case HealthEntryTypes.OccupationalHealthcare:
			const sickLeave1 = parseLeave(sickLeave);
			return {
				...intermediateObject,
				type: HealthEntryTypes.OccupationalHealthcare,
				employerName: parseString(employerName),
				...(sickLeave1 && { sickLeave: sickLeave1 }),
			};
		default:
			assertNever(typeOfEntry);
	}
}
