import React from 'react';
import { FormGroup, Row, Col, ControlLabel, FormControl } from 'react-bootstrap';


export function FieldGroup({ id, label, help, validationState, fieldSize, ...props }) {
	const fieldSizeToUse = fieldSize ? fieldSize : 4;
	return (
		<div>
			<FormGroup controlId={id} validationState= {validationState}>
				<Row>
					<Col xs={3} md={3} sm={3} lg={3}>
						<ControlLabel>{label}:</ControlLabel>
					</Col>
					<Col xs={fieldSizeToUse} md={fieldSizeToUse} sm={fieldSizeToUse} lg={fieldSizeToUse}>
						<FormControl {...props} />
					</Col>
				</Row>
			</FormGroup>
		</div>
	);
}
