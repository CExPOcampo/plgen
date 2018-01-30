import React, { Component } from 'react';
import { FieldGroup } from './FieldGroup';
import { Button } from 'react-bootstrap';

import * as _ from 'lodash';

export default class RelatedData extends Component {

	render() {

		const relatedDataToRender = [];
		const props = this.props;
		const parentIndex = props.parentIndex;
		const relateds = props['relatedData'];
		const num = relateds.length;

		if(num) {
			_.forEach(relateds, (related, index) => {
				relatedDataToRender.push(
					<div key={'relatedData' + index}>
						<h4> {'Related Data ' + parentIndex + '_' + index} </h4>

						<FieldGroup label="Related Data Name" placeholder="exampleRelatedName"
							id={`relatedName${parentIndex}_${index}`}
							value={relateds[index].name}
							onChange={(e) => props.setRelatedDataName(parentIndex, index, e.target.value)}
						/>

						<FieldGroup label="Related Data Column Letter" placeholder="A"
							id={`relatedColumn${parentIndex}_${index}`}
							value={relateds[index].relatedColumn}
							onChange={(e) => props.setRelatedDataLetter(parentIndex, index, e.target.value)}
						/>

						<h2>
							<Button bsStyle="danger" bsSize="small" type="button"
								onClick={() => props.removeRelatedData(parentIndex, index)}
							>
								{' - '}
							</Button>
						</h2>

						<br/>
					</div>
				);
			});

		}

		return (
			<div style={{paddingLeft: '5em'}}>

				<h3> {'Related Data: '}
					<Button bsStyle="success" type="button" onClick={() => props.addRelatedData(parentIndex)}>
						{' + '}
					</Button>
				</h3>

				{relatedDataToRender}

			</div>
		);
	}
}
