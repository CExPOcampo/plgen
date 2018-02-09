import React, { Component } from 'react';

import ColumnData from './ColumnData';
import RelatedDataSet from './RelatedDataSet';

export default class ColumnAndRelatedData extends Component {

	render() {

		const props = this.props;

		const columnData = props.columnData;
		const index = props.index;

		//https://stackoverflow.com/questions/35685290/context-and-variable-scope-in-es6-loops-and-foreach
		// Use arrow function here to retain 'this' context (lexical scoping)

		return (
			<div>

				<ColumnData
					index={index}
					columnData={columnData}

					setColumnDataLetter={props.setColumnDataLetter}
					setColumnDataPicklistName={props.setColumnDataPicklistName}
					setColumnDataParentLetters={props.setColumnDataParentLetters}
				/>

				<div style={{paddingLeft: '5em'}}>
					<RelatedDataSet
						parentIndex={index}
						relatedDataKeyList={columnData.relatedDataKeys}

						addRelatedDataKey={props.addRelatedDataKey}
						removeRelatedDataKey={props.removeRelatedDataKey}
					/>
				</div>

			</div>
		);
	}
}
