import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import AddButton from './AddButton';
import RemoveButton from './RemoveButton';

import * as relatedDataSetActionCreators from '../actions/relatedDataSetActions';

import RelatedData from './RelatedData';
import * as relatedDataActionCreators from '../actions/relatedDataActions';
import bindIndexToActionCreators from '../actions/bindIndexToActionCreators';

import uuidv4 from 'uuid/v4'

import asCollapsiblePanel from './CollapsiblePanelHoc';
const CollapsibleRelatedData = asCollapsiblePanel(RelatedData);

var wrappedRelatedDataActionCreators =
	index =>
		dispatch =>
			bindActionCreators(
				bindIndexToActionCreators(relatedDataActionCreators, index),
				dispatch
			);

class RelatedDataList extends Component {

	render() {

		const props = this.props;
		const relatedDataKeyList = props.relatedDataKeyList;
		const relatedDataSet = props.relatedDataSet;

		//https://stackoverflow.com/questions/35685290/context-and-variable-scope-in-es6-loops-and-foreach
		// Use arrow function here to retain 'this' context (lexical scoping)

		return (
			<div>

				<AddButton headerLabel={'Related Data: '}
					clickHandler={() => {
						const targetKey = uuidv4();
						// Add related data to relatedDataSet
						props.addRelatedData(targetKey);
						// Add related data key to parent columnData
						props.addRelatedDataKey(targetKey);
					}}
				/>

				{relatedDataKeyList.map((relatedDataKey) => {
					return (<div key={'relatedData_' + relatedDataKey}>

						{/*<h3><hr className="subSubBreaker"/></h3>*/}

						<CollapsibleRelatedData
							namespace="relatedDataPanel"
							title="Related Data: "
							titleName={relatedDataSet[relatedDataKey].name}

							targetKey={relatedDataKey}
							relatedData={relatedDataSet[relatedDataKey]}
							{...wrappedRelatedDataActionCreators(relatedDataKey)(props.dispatch)}
						/>

						<RemoveButton
							clickHandler={() => {
								// Remove related data from relatedDataSet
								props.removeRelatedData(relatedDataKey);
								// Remove related data key from parent columnData
								props.removeRelatedDataKey(relatedDataKey);
							}
						}/>

					</div>);
				})}

			</div>
		);
	}
}


function mapStateToProps(state){
	return {
		relatedDataSet: state.relatedDataSet
	};
}

function mapDispatchToProps(dispatch){
	// Bind 'dispatch' to multiple action creators
	// https://github.com/reactjs/redux/issues/363
	return {
		dispatch,
		...bindActionCreators(
			Object.assign({}, relatedDataSetActionCreators),
			dispatch
		)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RelatedDataList);

