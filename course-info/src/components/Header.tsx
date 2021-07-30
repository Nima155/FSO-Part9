import React from "react";

export default function Header({ courseName }: { courseName: string }) {
	return (
		<div>
			<h1>{courseName}</h1>
		</div>
	);
}
