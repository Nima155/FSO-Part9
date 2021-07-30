import React from "react";
import { CoursePart } from "../types";
import Part from "./Part";

export default function Content({
	courseParts,
}: {
	courseParts: CoursePart[];
}) {
	return (
		<div>
			{courseParts.map((e) => (
				<div key={e.name}>
					<h3>
						{e.name} {e.exerciseCount}
					</h3>
					<Part course={e} />
				</div>
			))}
		</div>
	);
}
