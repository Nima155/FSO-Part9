import moment from "moment";

export function isString(str: unknown): str is string {
	// a type guard... used to verify that str is in fact a string
	return typeof str === "string" || str instanceof String;
}

export function isDate(date: string): boolean {
	return moment(date, "YYYY-MM-DD", true).isValid();
}

const isValidEnum =
	<T>(e: T) =>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(type: any): type is T[keyof T] => {
		// console.log(Object.values(e));
		return Object.values(e).includes(type);
	};
export function parseDate(params: unknown): string {
	if (!params || !isString(params) || !isDate(params)) {
		throw new Error("Invalid or missing date");
	}
	return params;
}

export function parseString(str: unknown): string {
	if (!str || !isString(str)) {
		throw new Error("Value must be a string and not be empty");
	}
	return str; // legal as str's type is no longer unknown, due to the call to the typeguard above.
}

export function parseType<T>(e: T, type: unknown): T[keyof T] {
	if (type === undefined || !isValidEnum(e)(type))
		throw new Error(`Invalid type ${type}`);

	return type;
}
