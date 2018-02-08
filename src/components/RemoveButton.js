import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class RemoveButton extends Component {

	render() {

		const props = this.props;

		return (
			<h2>
				<Button bsStyle="danger" bsSize="small" type="button"
					onClick={props.clickHandler}
				>
					{' - '}
				</Button>
			</h2>
		);
	}
}
