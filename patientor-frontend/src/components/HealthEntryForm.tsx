import { Field, Form, Formik } from "formik";
import React from "react";
import { Prop } from "./Patient";
// import * as Yup from "yup";
import { HealthCheckRating, HealthEntryTypes } from "../types";
import { NumberField } from "../AddPatientModal/FormField";

// import moment from "moment";

import GeneralEntryForm, {
	generalValidationSchema,
	generalInitialValues,
} from "./GeneralEntryForm";
export default function HealthEntryForm({ onSubmit }: Prop) {
	return (
		<Formik
			initialValues={{
				type: HealthEntryTypes.HealthCheck,
				...generalInitialValues,
				healthCheckRating: HealthCheckRating.Healthy,
			}}
			onSubmit={onSubmit}
			validationSchema={generalValidationSchema}
		>
			{({ setFieldTouched, setFieldValue, dirty, isValid }) => (
				<Form className="form ui">
					<GeneralEntryForm
						setFieldTouched={setFieldTouched}
						setFieldValue={setFieldValue}
						dirty={dirty}
						isValid={isValid}
					>
						<Field
							label="Health Check Rating"
							name="healthCheckRating"
							component={NumberField}
							min={0}
							max={3}
						/>
					</GeneralEntryForm>
				</Form>
			)}
		</Formik>
	);
}
