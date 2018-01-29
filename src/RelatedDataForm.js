import React, { Component } from 'react';
import { FieldGroup } from './FieldGroup';

import * as _ from 'lodash';

export default class RelatedData extends Component {

	alterState(stateModder) {
		const nextState = _.cloneDeep(this.state);
		stateModder(nextState);
		this.setState(nextState);
	}

	addRelatedData() {
		this.alterState((nextState) => {
			nextState['numRelatedData']++;
			nextState['relatedData'].push({
				name: '',
				relatedColumn: ''
			});
		});
	}
	constructor(props) {
		super(props);
		this.state = {
			numRelatedData: 0,
			relatedData: []
		};
	}

	render() {

		const relatedData = [];
		const num = this.state['numRelatedData'];
		const relateds = this.state['relatedData'];
		const parentIndex = this.props.parentIndex;

		if(num) {
			_.forEach(relateds, (related, index) => {
				relatedData.push(
					<div key={'relatedData' + index}>

						<FieldGroup label="Related Data Name" placeholder="exampleRelatedName"
							id={`relatedName${parentIndex}_${index}`}
							onChange={(e) => {
								this.alterState((nextState) => {
									var accessor = `relatedData[${index}].name`;
									_.set(nextState, accessor, e.target.value);
								});
							}}
							value={this.state.relatedData[index].name}
						/>

						<FieldGroup label="Related Data Column Letter" placeholder="A"
							id={`relatedColumn${parentIndex}_${index}`}
							onChange={(e) => {
								this.alterState((nextState) => {
									var accessor = `relatedData[${index}].relatedColumn`;
									_.set(nextState, accessor, e.target.value);
								});
							}}
							value={this.state.relatedData[index].relatedColumn}
						/>

						<br/>
					</div>
				);
			});

		}

		return (
			<div style={{paddingLeft: '10em'}}>
				<h3> Related Data <button type="button" onClick={this.addRelatedData.bind(this)}>+</button></h3>

				{relatedData}

			</div>
		);
	}
}
