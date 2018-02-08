import React, { Component } from 'react';
import { FieldGroup } from './FieldGroup';
import { Button } from 'react-bootstrap';

import * as _ from 'lodash';

export default class RelatedData extends Component {

	render() {

		const props = this.props;
		const parentIndex = props.parentIndex;
		const index = props.index;
		const relatedData = props.relatedData;

		return (
			<div>
				<h4> {'Related Data ' + parentIndex + '_' + index} </h4>

				<FieldGroup label="Related Data Name" placeholder="exampleRelatedName"
					id={`relatedName${parentIndex}_${index}`}
					value={relatedData.name}
					onChange={(e) => props.setRelatedDataName(e.target.value)}
				/>

				<FieldGroup label="Related Data Column Letter" placeholder="A"
					id={`relatedColumn${parentIndex}_${index}`}
					value={relatedData.relatedColumn}
					onChange={(e) => props.setRelatedDataLetter(e.target.value)}
				/>

				<br/>

			</div>
		);
	}
}
