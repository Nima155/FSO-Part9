import React, { MouseEventHandler, useState } from "react";
import { Button, Container, Tab, Transition } from "semantic-ui-react";
import HealthEntryForm from "./HealthEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalEntryForm from "./OccupationalEntryForm";
import { Prop } from "./Patient";

interface PropPlus extends Prop {
	openState: boolean;
	setOpenState: MouseEventHandler;
}

const panes = ({ onSubmit, openState, setOpenState }: PropPlus) => [
	{
		menuItem: "Occupational Health",
		// eslint-disable-next-line react/display-name
		render: () => (
			<>
				<Button onClick={setOpenState}>{openState ? "Hide" : "Show"}</Button>
				<Tab.Pane attached={false} active={openState}>
					<Transition animation="fade down" visible={openState}>
						<Container>
							<OccupationalEntryForm onSubmit={onSubmit} />
						</Container>
					</Transition>
				</Tab.Pane>
			</>
		),
	},
	{
		menuItem: "Health Check",
		// eslint-disable-next-line react/display-name
		render: () => (
			<>
				<Button onClick={setOpenState}>{openState ? "Hide" : "Show"}</Button>
				<Tab.Pane attached={false} active={openState}>
					<Transition animation="fade down" visible={openState}>
						<Container>
							<HealthEntryForm onSubmit={onSubmit} />
						</Container>
					</Transition>
				</Tab.Pane>
			</>
		),
	},
	{
		menuItem: "Hospital",
		// eslint-disable-next-line react/display-name
		render: () => (
			<>
				<Button onClick={setOpenState}>{openState ? "Hide" : "Show"}</Button>
				<Tab.Pane attached={false} active={openState}>
					<Transition animation="fade down" visible={openState}>
						<Container>
							<HospitalEntryForm onSubmit={onSubmit} />
						</Container>
					</Transition>
				</Tab.Pane>
			</>
		),
	},
];

export default function FormEntryTabs(prop: Prop) {
	const [tabState, setTabState] = useState(false);
	return (
		<Tab
			panes={panes({
				...prop,
				setOpenState: () => setTabState(!tabState),
				openState: tabState,
			})}
			menu={{ secondary: true, pointing: true }}
		/>
	);
}
