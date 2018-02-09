import React from 'react';
import { FormGroup, Row, Col, ControlLabel, FormControl } from 'react-bootstrap';


export function FieldGroup({ id, label, help, validationState, ...props }) {
	return (
		<div>
			<FormGroup controlId={id} validationState= {validationState}>
				<Row>
					<Col xs={3} md={3} sm={3} lg={3}>
						<ControlLabel>{label}:</ControlLabel>
					</Col>
					<Col xs={5} md={5} sm={5} lg={5}>
						<FormControl {...props} />
					</Col>
				</Row>
			</FormGroup>
		</div>
	);
}
