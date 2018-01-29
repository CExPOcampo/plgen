import React from 'react';
import { FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';


export function FieldGroup({ id, label, help, ...props }) {
	return (
		<div>
			<FormGroup controlId={id}>
				<Col xs={3} md={3} sm={3}>
					<ControlLabel>{label}:</ControlLabel>
				</Col>
				<Col xs={6} md={6} sm={6}>
					<FormControl {...props} />
				</Col>
			</FormGroup>
		</div>
	);
}
