import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { addOrUpdatePatientAction, useStateValue } from "../state";
import { HealthEntryWithoutId, Patient as PatientType } from "../types";
import { Entry } from "./Entry";
import FormEntryTabs from "./FormEntryTabs";

export interface Prop {
	onSubmit: (values: HealthEntryWithoutId) => void;
}

export default function Patient() {
	const { id } = useParams<{ id: string }>();
	const [{ patients }, dispatch] = useStateValue();

	const onSubmit = async (values: HealthEntryWithoutId) => {
		try {
			const { data: newEntry } = await axios.post<PatientType>(
				`${apiBaseUrl}/patients/${id}/entries`,
				values
			);
			dispatch(addOrUpdatePatientAction(newEntry));
		} catch (error) {
			console.log();
		}
	};

	React.useEffect(() => {
		if (patients[id]?.ssn) return;

		void (async () => {
			// void must prefix the function call.. void is an operator that accepts some RHS argument and returns undefined...
			// we use void in order to suppress the floating promise err
			try {
				const { data: singlePatient } = await axios.get<PatientType>(
					`${apiBaseUrl}/patients/${id}`
				);
				dispatch(addOrUpdatePatientAction(singlePatient));
			} catch (error) {
				console.error(error.message);
			}
		})();
	}, [id]);

	const { ssn, entries, gender, name, occupation } = patients[id] ?? {
		ssn: undefined,
		gender: undefined,
		name: undefined,
		occupation: undefined,
		entries: undefined,
	};

	return (
		<div>
			<h3>
				{name}{" "}
				{gender === "male" ? (
					<i className="mars icon"></i>
				) : gender === "female" ? (
					<i className="venus icon"></i>
				) : (
					<i className="genderless icon"></i>
				)}
			</h3>
			<p>ssn: {ssn}</p>
			<p>occupation: {occupation}</p>

			<h4>entries</h4>
			{entries?.length ? (
				entries?.map((entry) => <Entry entry={entry} key={entry.id} />)
			) : (
				<p>No entries to this date</p>
			)}
			<FormEntryTabs onSubmit={onSubmit} />
		</div>
	);
}
