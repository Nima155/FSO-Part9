import { Field } from "formik";
import moment from "moment";
import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

import * as Yup from "yup";

export const generalInitialValues = {
	description: "",
	date: "",
	specialist: "",
	diagnosisCodes: undefined,
};

export const generalValidationSchema = Yup.object({
	description: Yup.string().required(),
	date: Yup.string()
		.required()
		.test("is-date", "${path} is not valid", (date) =>
			date?.length ? moment(date, "YYYY-MM-DD", true).isValid() : true
		),
	specialist: Yup.string()
		.min(3, "Specialist name must be at least 3 characters long")
		.required(),
});

interface PropPlus {
	setFieldTouched: (
		field: string,
		isTouched?: boolean | undefined,
		shouldValidate?: boolean | undefined
	) => void;
	setFieldValue: (
		field: string,
		value: any,
		shouldValidate?: boolean | undefined
	) => void;
	dirty: boolean;
	isValid: boolean;
	children?: React.ReactNode;
}

export default function GeneralEntryForm({
	dirty,
	isValid,
	setFieldTouched,
	setFieldValue,
	children,
}: PropPlus) {
	const [{ diagnoses }] = useStateValue();
	return (
		<>
			<Field
				name="description"
				label="Description"
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
			{children}
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
		</>
	);
}
