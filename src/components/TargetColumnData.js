import React, { Component } from 'react';
import { FieldGroup } from './FieldGroup';

import RelatedDataForm from './RelatedDataForm';

export default class TargetColumnData extends Component {

	render() {


		const props = this.props;

		const columnData = props.columnData;
		const index = props.index;

		//https://stackoverflow.com/questions/35685290/context-and-variable-scope-in-es6-loops-and-foreach
		// Use arrow function here to retain 'this' context (lexical scoping)

		return (
			<div>

				<h3> {'Column Data ' + index} </h3>

				<FieldGroup label="Column Letter" placeholder="A"
					id={`column${index}`}
					value={columnData.column}
					onChange={(e) => props.setColumnDataLetter(e.target.value)}
				/>

				<FieldGroup label="Picklist Name" placeholder="exampleName"
					id={`picklistName${index}`}
					value={columnData.picklistName}
					onChange={(e) => props.setColumnDataPicklistName(e.target.value)}
				/>

				<FieldGroup label="Parent Column Letters" placeholder="A,B"
					id={`parentColumns${index}`}
					value={columnData.parentColumns}
					onChange={(e) => props.setColumnDataParentLetters(e.target.value)}
				/>


				{/*
				<RelatedDataForm
					parentIndex={index}
					relatedData={column.relatedData}
					addRelatedData={props.addRelatedData}
					removeRelatedData={props.removeRelatedData}

					setRelatedDataName={props.setRelatedDataName}
					setRelatedDataLetter={props.setRelatedDataLetter}
				/>
				*/}

			</div>
		);
	}
}
