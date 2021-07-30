import { Field, Form, Formik } from "formik";
import React from "react";
import { Button, Grid } from "semantic-ui-react";
import { DiagnosisSelection, TextField } from "../AddPatientModal/FormField";

import { useStateValue } from "../state";
import { HealthEntryTypes, OccupationalHealthCareEntry } from "../types";
import { Prop } from "./Patient";
// interface

export default function OccupationalEntryForm({ onSubmit }: Prop) {
	const [{ diagnoses }] = useStateValue();
	return (
		<Formik
			initialValues={{
				type: HealthEntryTypes.OccupationalHealthcare,
				description: "",
				date: "",
				specialist: "",
				diagnosisCodes: undefined,
				employerName: "",
			}}
			onSubmit={onSubmit}
			validate={(value: Omit<OccupationalHealthCareEntry, "id">) => {
				const errors: { [field: string]: string } = {};
				const REQUIRED = "required";
				if (!value.description) errors.description = REQUIRED;
				if (!value.date) errors.date = REQUIRED;
				if (!value.specialist) errors.specialist = REQUIRED;
				if (!value.employerName) errors.employerName = REQUIRED;

				return errors;
			}}
		>
			{(
				{ setFieldValue, setFieldTouched, dirty, isValid } // dirty => user has touched the field,
			) => (
				// isValid checks the validation callBack
				<Form className="form ui">
					<Field
						label="Description"
						name="description"
						placeholder="Description"
						component={TextField}
					/>
					<Field
						label="Date of Event"
						placeholder="YYYY-MM-DD"
						name="date"
						component={TextField}
					/>
					<Field
						label="Dr."
						placeholder="Name of specialist"
						name="specialist"
						component={TextField}
					/>
					<Field
						label="Employer"
						placeholder="Patients employer"
						name="employerName"
						component={TextField}
					/>
					<Field
						label="Sick Leave"
						placeholder="Patients employer"
						name="SickLeave"
						component={TextField}
					/>
					<DiagnosisSelection
						setFieldValue={setFieldValue}
						setFieldTouched={setFieldTouched}
						diagnoses={Object.values(diagnoses)}
					/>
					<Grid>
						<Grid.Column floated="right" width={5}>
							<Button
								type="submit"
								floated="right"
								color="green"
								disabled={!dirty || !isValid}
							>
								Add
							</Button>
						</Grid.Column>
					</Grid>
				</Form>
			)}
		</Formik>
	);
}
