import React, { Component } from 'react';
import { Col, ControlLabel, Checkbox } from 'react-bootstrap';

export default class CheckboxField extends Component {

	render() {

		const props = this.props;

		return (
			<div>

				<Col xs={2} md={2} sm={2} lg={2}>
					<ControlLabel>{props.label}</ControlLabel>
				</Col>
				<Col xs={1} md={1} sm={1} lg={1}>
					<Checkbox checked={props.checked}
						onChange={(e) => {props.onChange(e.target.checked)}}
					/>
				</Col>

			</div>
		);
	}
}
