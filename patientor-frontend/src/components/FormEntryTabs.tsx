import React from "react";
import { Tab } from "semantic-ui-react";
import HealthEntryForm from "./HealthEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalEntryForm from "./OccupationalEntryForm";
import { Prop } from "./Patient";

const panes = ({ onSubmit }: Prop) => [
	{
		menuItem: "Occupational Health",
		// eslint-disable-next-line react/display-name
		render: () => (
			<Tab.Pane attached={false}>
				<OccupationalEntryForm onSubmit={onSubmit} />
			</Tab.Pane>
		),
	},
	{
		menuItem: "Health Check",
		// eslint-disable-next-line react/display-name
		render: () => (
			<Tab.Pane attached={false}>
				<HealthEntryForm onSubmit={onSubmit} />
			</Tab.Pane>
		),
	},
	{
		menuItem: "Hospital",
		// eslint-disable-next-line react/display-name
		render: () => (
			<Tab.Pane attached={false}>
				<HospitalEntryForm onSubmit={onSubmit} />
			</Tab.Pane>
		),
	},
];

export default function FormEntryTabs(prop: Prop) {
	return <Tab panes={panes(prop)} menu={{ secondary: true, pointing: true }} />;
}
