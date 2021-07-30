export default function assertNever(_param: never): never {
	throw new Error("unhandled action");
}
