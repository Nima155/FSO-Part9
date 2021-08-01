import { Field, Form, Formik } from "formik";
import React from "react";
import { Form as SForm } from "semantic-ui-react";
import { TextField } from "../AddPatientModal/FormField";
import * as Yup from "yup";

import { HealthEntryTypes } from "../types";
import { Prop } from "./Patient";
import moment from "moment";
import GeneralEntryForm, {
	generalInitialValues,
	generalValidationSchema,
} from "./GeneralEntryForm";
// interface

export default function OccupationalEntryForm({ onSubmit }: Prop) {
	return (
		<Formik
			initialValues={{
				type: HealthEntryTypes.OccupationalHealthcare,
				...generalInitialValues,
				employerName: "",
				sickLeave: { startDate: "", endDate: "" },
			}}
			onSubmit={onSubmit}
			validationSchema={generalValidationSchema.concat(
				Yup.object({
					employerName: Yup.string()
						.min(2, "Employer name must be at least 2 characters long")
						.required("Required"),
					sickLeave: Yup.object().shape(
						{
							startDate: Yup.string()
								.test("is-date", "${path} is not valid", (date) =>
									// moment(date, "YYYY-MM-DD", true);
									date?.length
										? moment(date, "YYYY-MM-DD", true).isValid()
										: true
								)
								.ensure()
								.when("endDate", {
									is: (endDate: string) => endDate && endDate.length > 0,
									then: Yup.string().required("required"),
								}),
							endDate: Yup.string()
								.test(
									"is-date",
									"${path} is not valid or is before the start date",
									function (date) {
										// we use a normal anonymous function as it gets its own (this)

										return date?.length
											? moment(date, "YYYY-MM-DD", true).isValid() &&
													moment(date).isAfter(this.parent.startDate)
											: true;
									}
								)
								.ensure()
								.when("startDate", {
									is: (startDate: string) => startDate && startDate.length > 0,
									then: Yup.string().required("required"),
								}),
						},
						[["endDate", "startDate"]]
					),
				})
			)}
		>
			{(
				{ setFieldValue, setFieldTouched, dirty, isValid } // dirty => user has touched the field,
			) => (
				// isValid checks the validation callBack
				<Form className="form ui">
					<GeneralEntryForm
						setFieldTouched={setFieldTouched}
						setFieldValue={setFieldValue}
						dirty={dirty}
						isValid={isValid}
					>
						<Field
							label="Employer"
							placeholder="Patients employer"
							name="employerName"
							component={TextField}
						/>
						<SForm.Group widths="equal">
							<Field
								label="Starting date of sick leave"
								placeholder="YYYY-MM-DD"
								name="sickLeave.startDate"
								component={TextField}
							/>
							<Field
								label="End date of sick leave"
								placeholder="YYYY-MM-DD"
								name="sickLeave.endDate"
								component={TextField}
							/>
						</SForm.Group>
					</GeneralEntryForm>
				</Form>
			)}
		</Formik>
	);
}
