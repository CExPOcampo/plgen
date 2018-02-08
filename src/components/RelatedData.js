import React, { Component } from 'react';
import { FieldGroup } from './FieldGroup';

export default class RelatedData extends Component {

	render() {

		const props = this.props;
		const targetKey = props.targetKey;
		const relatedData = props.relatedData;

		return (
			<div>
				<h4> {'Related Data ' + targetKey.substring(0, 3)} </h4>

				<FieldGroup label="Related Data Name" placeholder="exampleRelatedName"
					id={`relatedName${targetKey}`}
					value={relatedData.name}
					onChange={(e) => props.setRelatedDataName(e.target.value)}
				/>

				<FieldGroup label="Related Data Column Letter" placeholder="A"
					id={`relatedColumn${targetKey}`}
					value={relatedData.relatedColumn}
					onChange={(e) => props.setRelatedDataLetter(e.target.value)}
				/>

				<br/>

			</div>
		);
	}
}
