import React, { Component } from 'react';
import { FieldGroup } from './FieldGroup';

export default class ColumnData extends Component {

	render() {

		const props = this.props;

		const columnData = props.columnData;
		const index = props.index;

		//https://stackoverflow.com/questions/35685290/context-and-variable-scope-in-es6-loops-and-foreach
		// Use arrow function here to retain 'this' context (lexical scoping)

		return (
			<div>

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

				{columnData.hasParent ?
					<FieldGroup label="Parent Column Letters" placeholder="A,B"
						id={`parentColumns${index}`}
						value={columnData.parentColumns}
						onChange={(e) => props.setColumnDataParentLetters(e.target.value)}
					/>
					:
					null
				}

				{columnData.hasRank ?
					<FieldGroup label="Rank" type="number" min={0}
						id={`rank${index}`}
						value={columnData.rank}
						onChange={(e) => props.setColumnDataRank(e.target.value)}
					/>
					:
					null
				}

			</div>
		);
	}
}
