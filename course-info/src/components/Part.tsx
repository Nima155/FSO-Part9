import { CoursePart } from "../types";
import React from "react";

function assertNever(param: never): never {
	// will give us compile time error if we don't handle some member
	// never
	throw new Error(`Unhandled union member ${JSON.stringify(param)}`);
}

export default function Part({ course }: { course: CoursePart }) {
	switch (course.type) {
		case "normal":
			return <em>{course.description}</em>;
		case "groupProject":
			return (
				<>
					<p>project exercises: {course.groupProjectCount}</p>
				</>
			);

		case "submission":
			return (
				<>
					<em>{course.description}</em>
					<p>submit to {course.exerciseSubmissionLink}</p>
				</>
			);
		case "special":
			return (
				<>
					<em>{course.description}</em>
					<p>required skills: {course.requirements.join(", ")}</p>
				</>
			);
		default:
			return assertNever(course);
	}
}
