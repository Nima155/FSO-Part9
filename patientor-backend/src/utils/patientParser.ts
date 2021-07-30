/* 
 	We could essentially create different parsers for the different fields that are supposed
	to be of type string. This could help with better err messages, but...
*/

import { HealthEntry, Gender, PatientEntry, HealthEntryTypes } from "../types";
import { isString, parseDate, parseString, parseType } from "./genericParsers";

function isEntries(entries: unknown): entries is HealthEntry[] {
	return (
		Array.isArray(entries) &&
		entries.every((e) => Object.values(HealthEntryTypes).includes(e.type)) // not really solid...
	);
}

function isSSN(param: string) {
	return param.length > 7 && /^\d{6}-/.test(param);
}

function parseSSN(str: unknown): string {
	if (!str || !isString(str) || !isSSN(str)) {
		throw new Error("Invalid social security number, try again");
	}
	return str;
}

function parseEntry(entry: unknown): HealthEntry[] {
	if (!entry || !isEntries(entry)) {
		throw new Error("Invalid entries array");
	}
	return entry;
}

type Fields = {
	dateOfBirth: unknown;
	gender: unknown;
	name: unknown;
	occupation: unknown;
	ssn: unknown;
	entries: unknown;
};

export default function toNewPatient({
	dateOfBirth,
	gender,
	name,
	occupation,
	ssn,
	entries,
}: Fields): PatientEntry {
	return {
		dateOfBirth: parseDate(dateOfBirth),
		gender: parseType(Gender, gender),
		name: parseString(name),
		occupation: parseString(occupation),
		ssn: parseSSN(ssn),
		entries: parseEntry(entries),
	};
}
