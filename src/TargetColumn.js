import React, { Component } from 'react';
import { FieldGroup } from './FieldGroup';

import RelatedDataForm from './RelatedDataForm';
import * as _ from 'lodash';

export default class TargetColumn extends Component {

	render() {

		const columnData = [];
		const props = this.props;
		const columns = props.columns;
		const num = columns.length;

		if(num) {
			//https://stackoverflow.com/questions/35685290/context-and-variable-scope-in-es6-loops-and-foreach
			// Use arrow function here to retain 'this' context (lexical scoping)
			_.forEach(columns, (column, index) => {
				columnData.push(
					<div key={'columnData' + index}>
						<h2> {'Column ' + index} </h2>

						<FieldGroup label="Column Letter" placeholder="A"
							id={`column${index}`}
							value={columns[index].column}
							onChange={props.onChangeHandlerGen(`columns[${index}].column`)}
						/>

						<FieldGroup label="Picklist Name" placeholder="exampleName"
							id={`picklistName${index}`}
							value={columns[index].picklistName}
							onChange={props.onChangeHandlerGen(`columns[${index}].picklistName`)}
						/>

						<FieldGroup label="Parent Column Letters" placeholder="A,B"
							id={`parentColumns${index}`}
							value={columns[index].parentColumns}
							onChange={props.onChangeHandlerGen(`columns[${index}].parentColumns`)}
						/>


						{/*
						<RelatedDataForm parentIndex={index}/>
						*/}

						<br/>

					</div>
				);
			});

		}

		return (
			<div>
				<h1> Column Data <button type="button" onClick={this.props.addColumnData}>+</button></h1>

				{columnData}

			</div>
		);
	}
}
