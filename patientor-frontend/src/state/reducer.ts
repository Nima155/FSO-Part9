import { State } from "./state";
import { Patient, Diagnosis } from "../types";
import assertNever from "../utils";
export type Action =
	| {
			type: "SET_PATIENT_LIST";
			payload: Patient[];
			// eslint-disable-next-line no-mixed-spaces-and-tabs
	  }
	| {
			type: "ADD_PATIENT";
			payload: Patient;
			// eslint-disable-next-line no-mixed-spaces-and-tabs
	  }
	| {
			type: "UPDATE_PATIENT";
			payload: Patient;
			// eslint-disable-next-line no-mixed-spaces-and-tabs
	  }
	| {
			type: "SET_DIAGNOSES_LIST";
			payload: Diagnosis[];
			// eslint-disable-next-line no-mixed-spaces-and-tabs
	  };

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_PATIENT_LIST":
			return {
				...state,
				patients: {
					...action.payload.reduce(
						(memo, patient) => ({ ...memo, [patient.id]: patient }),
						{}
					),
					...state.patients,
				},
			};
		case "UPDATE_PATIENT": // fall through
		case "ADD_PATIENT":
			return {
				...state,
				patients: {
					...state.patients,
					[action.payload.id]: action.payload,
				},
			};
		case "SET_DIAGNOSES_LIST":
			return {
				...state,
				diagnoses: {
					...action.payload.reduce(
						(upTill, cur) => ({
							...upTill,
							[cur.code]: cur,
						}),
						{}
					),
					...state.diagnoses,
				},
			};
		default:
			return assertNever(action);
	}
};
export function initialisePatientListAction(payload: Patient[]): Action {
	return {
		type: "SET_PATIENT_LIST",
		payload,
	};
}
export function addOrUpdatePatientAction(payload: Patient): Action {
	return {
		type: "ADD_PATIENT",
		payload,
	};
}
export function initialiseDiagnosesAction(payload: Diagnosis[]): Action {
	return {
		type: "SET_DIAGNOSES_LIST",
		payload,
	};
}
