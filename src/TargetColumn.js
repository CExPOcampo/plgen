import React, { Component } from 'react';
import { FieldGroup } from './FieldGroup';

import { Button } from 'react-bootstrap';
import RelatedDataForm from './RelatedDataForm';
import * as _ from 'lodash';

export default class TargetColumn extends Component {

	render() {

		const columnDataToRender = [];
		const props = this.props;
		const columns = props.columns;
		const num = columns.length;

		if(num) {
			//https://stackoverflow.com/questions/35685290/context-and-variable-scope-in-es6-loops-and-foreach
			// Use arrow function here to retain 'this' context (lexical scoping)
			_.forEach(columns, (column, index) => {
				columnDataToRender.push(
					<div key={'columnData' + index}>
						<h3> {'Column Data ' + index} </h3>

						<FieldGroup label="Column Letter" placeholder="A"
							id={`column${index}`}
							value={column.column}
							onChange={(e) => props.setLetter(index, e.target.value)}
						/>

						<FieldGroup label="Picklist Name" placeholder="exampleName"
							id={`picklistName${index}`}
							value={column.picklistName}
							onChange={(e) => props.setPicklistName(index, e.target.value)}
						/>

						<FieldGroup label="Parent Column Letters" placeholder="A,B"
							id={`parentColumns${index}`}
							value={column.parentColumns}
							onChange={(e) => props.setParentLetters(index, e.target.value)}
						/>


						<RelatedDataForm
							parentIndex={index}
							relatedData={column.relatedData}
							addRelatedData={props.addRelatedData}
							removeRelatedData={props.removeRelatedData}

							setRelatedDataName={props.setRelatedDataName}
							setRelatedDataLetter={props.setRelatedDataLetter}
						/>

						<h2>
							<Button bsStyle="danger" bsSize="small" type="button"
								onClick={() => props.removeColumn(index)}
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
			<div>
				<h2> {'Column Data: '}
					<Button bsStyle="success" type="button" onClick={props.addColumn}>
						{' + '}
					</Button>
				</h2>

				{columnDataToRender}

			</div>
		);
	}
}
