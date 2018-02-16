import React, { Component } from 'react';

import ColumnData from './ColumnData';
import RelatedDataSet from './RelatedDataSet';

import { Row } from 'react-bootstrap';

import CheckboxField from './CheckboxField';

export default class ColumnAndRelatedData extends Component {

	render() {

		const props = this.props;

		const columnData = props.columnData;
		const index = props.index;

		//https://stackoverflow.com/questions/35685290/context-and-variable-scope-in-es6-loops-and-foreach
		// Use arrow function here to retain 'this' context (lexical scoping)

		return (
			<div>

				<Row>
					<CheckboxField
						label="Parents?: "
						checked={columnData.hasParent}
						onChange={props.setHasParent}
					/>
					<CheckboxField
						label="Rank?: "
						checked={columnData.hasRank}
						onChange={props.setHasRank}
					/>
					<CheckboxField
						label="Related Data?: "
						checked={columnData.hasRelatedData}
						onChange={props.setHasRelatedData}
					/>
				</Row>


				<ColumnData
					index={index}
					columnData={columnData}

					setColumnDataLetter={props.setColumnDataLetter}
					setColumnDataPicklistName={props.setColumnDataPicklistName}
					setColumnDataParentLetters={props.setColumnDataParentLetters}
					setColumnDataRank={props.setColumnDataRank}
				/>

				{columnData.hasRelatedData ?
					<div style={{paddingLeft: '5em'}}>
						<RelatedDataSet
							parentIndex={index}
							relatedDataKeyList={columnData.relatedDataKeys}

							addRelatedDataKey={props.addRelatedDataKey}
							removeRelatedDataKey={props.removeRelatedDataKey}
						/>
					</div>
					:
					null
				}


			</div>
		);
	}
}
