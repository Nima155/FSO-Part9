import diags from "../data/diagnoses.json";
import { Diagnose } from "../types";
export function fetchAllDiagnoses(): Diagnose[] {
	return diags;
}
