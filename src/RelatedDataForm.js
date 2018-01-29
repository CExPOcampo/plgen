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

						<FieldGroup label="Related Data Name" placeholder="exampleRelatedName"
							id={`relatedName${parentIndex}_${index}`}
							value={relateds[index].name}
							onChange={props.onChangeHandlerGen(`columns[${parentIndex}].relatedData[${index}].name`)}
						/>

						<FieldGroup label="Related Data Column Letter" placeholder="A"
							id={`relatedColumn${parentIndex}_${index}`}
							value={relateds[index].relatedColumn}
							onChange={props.onChangeHandlerGen(`columns[${parentIndex}].relatedData[${index}].relatedColumn`)}
						/>

						<br/>
					</div>
				);
			});

		}

		return (
			<div style={{paddingLeft: '5em'}}>
				{/*<h3> Related Data <button type="button" onClick={this.addRelatedData.bind(this)}>+</button></h3>*/}
				<h3> Related Data
					<Button type="button" onClick={this.props.addRelatedDataFuncGen(parentIndex)}>
						+
					</Button>
				</h3>

				{relatedDataToRender}

			</div>
		);
	}
}
