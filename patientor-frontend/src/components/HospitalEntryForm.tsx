import { Field, Form, Formik } from "formik";
import React from "react";
import { HealthEntryTypes } from "../types";
import { Prop } from "./Patient";
import * as Yup from "yup";
import moment from "moment";

import { TextField } from "../AddPatientModal/FormField";
import { Form as SForm } from "semantic-ui-react";
import GeneralEntryForm, {
	generalValidationSchema,
	generalInitialValues,
} from "./GeneralEntryForm";
export default function HospitalEntryForm({ onSubmit }: Prop) {
	return (
		<Formik
			initialValues={{
				type: HealthEntryTypes.Hospital,
				...generalInitialValues,
				discharge: {
					date: "",
					criteria: "",
				},
			}}
			onSubmit={onSubmit}
			validationSchema={generalValidationSchema.concat(
				Yup.object({
					discharge: Yup.object({
						date: Yup.string()
							.required()
							.test("is-date", "${path} is not valid", (date) =>
								date?.length ? moment(date, "YYYY-MM-DD", true).isValid() : true
							),
						criteria: Yup.string().required(),
					}),
				})
			)}
		>
			{({ setFieldTouched, setFieldValue, dirty, isValid }) => (
				<Form className="form ui">
					<GeneralEntryForm
						dirty={dirty}
						isValid={isValid}
						setFieldTouched={setFieldTouched}
						setFieldValue={setFieldValue}
					>
						<SForm.Group widths="equal">
							<Field
								label="Date of discharge"
								placeholder="YYYY-MM-DD"
								name="discharge.date"
								component={TextField}
							/>
							<Field
								label="Discharge criteria"
								placeholder="Criteria"
								name="discharge.criteria"
								component={TextField}
							/>
						</SForm.Group>
					</GeneralEntryForm>
				</Form>
			)}
		</Formik>
	);
}
