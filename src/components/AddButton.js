import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class AddButton extends Component {

	render() {

		const props = this.props;

		return (
			<h2> {`${props.headerLabel}`}
				<Button
					bsStyle="success" type="button"
					onClick={props.clickHandler}
				>
					<span className="glyphicon glyphicon-plus-sign"/>
				</Button>
			</h2>
		);
	}
}
