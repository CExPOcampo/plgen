import React, { Component } from 'react';
import { FieldGroup } from './FieldGroup';

import RelatedDataForm from './RelatedDataForm';
import * as _ from 'lodash';

export default class TargetColumn extends Component {

	alterState(stateModder) {
		const nextState = _.cloneDeep(this.state);
		stateModder(nextState);
		this.setState(nextState);
	}

	addColumnData() {
		this.alterState((nextState) => {
			nextState['numColumns']++;
			nextState['columns'].push({
				column: '',
				picklistName: '',
				parentColumns: ''
			});
		});
	}

	constructor(props) {
		super(props);
		this.state = {
			numColumns: 0,
			columns: []
		};
	}
	render() {

		const columnData = [];
		const num = this.state['numColumns'];
		const columns = this.state['columns'];

		if(num) {
			//https://stackoverflow.com/questions/35685290/context-and-variable-scope-in-es6-loops-and-foreach
			// Use arrow function here to retain 'this' context (lexical scoping)
			_.forEach(columns, (column, index) => {
				columnData.push(
					<div key={'columnData' + index}>
						<h2> {'Column ' + index} </h2>

						<FieldGroup label="Column Letter" placeholder="A"
							id={`column${index}`}
							onChange={(e) => {
								this.alterState((nextState) => {
									var accessor = `columns[${index}].column`;
									_.set(nextState, accessor, e.target.value);
								});
							}}
							value={this.state.columns[index].column}
						/>

						<FieldGroup label="Picklist Name" placeholder="exampleName"
							id={`picklistName${index}`}
							onChange={(e) => {
								this.alterState((nextState) => {
									var accessor = `columns[${index}].picklistName`;
									_.set(nextState, accessor, e.target.value);
								});
							}}
							value={this.state.columns[index].picklistName}
						/>

						<FieldGroup label="Parent Column Letters" placeholder="A,B"
							id={`parentColumns${index}`}
							onChange={(e) => {
								this.alterState((nextState) => {
									var accessor = `columns[${index}].parentColumns`;
									_.set(nextState, accessor, e.target.value);
									console.log(nextState.columns[index].parentColumns);
								});
							}}
							value={this.state.columns[index].parentColumns}
						/>


						<RelatedDataForm parentIndex={index}/>


						<br/>

					</div>
				);
			});

		}

		return (
			<div>
				<h1> Column Data <button type="button" onClick={this.addColumnData.bind(this)}>+</button></h1>

				{columnData}

			</div>
		);
	}
}
