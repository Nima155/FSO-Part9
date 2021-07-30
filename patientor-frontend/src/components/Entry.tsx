import React from "react";
import { Icon, Segment } from "semantic-ui-react";
import { HealthEntry, HealthEntryTypes } from "../types";
import assertNever from "../utils";

function CommonEntrySection({
	record,
	iconVariety,
	children,
}: {
	record: HealthEntry;
	iconVariety: string;
	children?: React.ReactNode;
}) {
	return (
		<>
			<p style={{ marginBottom: 0 }}>
				<strong>{record.date}</strong>{" "}
				<Icon className={iconVariety} size="big" />
				{children}
			</p>
			<p style={{ marginBottom: 5 }}>
				<em style={{ color: "GrayText" }}>{record.description}</em>
			</p>
		</>
	);
}

export function HealthCheckEntry({
	record,
}: {
	record: Extract<HealthEntry, { type: HealthEntryTypes.HealthCheck }>;
}) {
	const rate = record.healthCheckRating;
	return (
		<Segment raised>
			<CommonEntrySection record={record} iconVariety="user md" />
			<Icon
				className="heart"
				color={
					!rate ? "green" : rate == 1 ? "yellow" : rate == 2 ? "orange" : "red"
				}
			></Icon>
		</Segment>
	);
}
export function HospitalEntry({
	record,
}: {
	record: Extract<HealthEntry, { type: HealthEntryTypes.Hospital }>;
}) {
	return (
		<Segment raised>
			<CommonEntrySection record={record} iconVariety="hospital" />
		</Segment>
	);
}

export function OccupationalHealthcaseEntry({
	record,
}: {
	record: Extract<
		HealthEntry,
		{ type: HealthEntryTypes.OccupationalHealthcare }
	>;
}) {
	return (
		<Segment raised>
			<CommonEntrySection record={record} iconVariety="stethoscope icon">
				<strong>{record.employerName}</strong>
			</CommonEntrySection>
		</Segment>
	);
}
export function Entry({ entry }: { entry: HealthEntry }) {
	switch (entry.type) {
		case HealthEntryTypes.HealthCheck:
			return <HealthCheckEntry record={entry} />;
		case HealthEntryTypes.Hospital:
			return <HospitalEntry record={entry} />;
		case HealthEntryTypes.OccupationalHealthcare:
			return <OccupationalHealthcaseEntry record={entry} />;
		default:
			return assertNever(entry);
	}
}
