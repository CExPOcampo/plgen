import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import AddButton from './AddButton';
import RemoveButton from './RemoveButton';

import * as relatedDataSetActionCreators from '../actions/relatedDataSetActions';

import RelatedData from './RelatedData';
import * as relatedDataActionCreators from '../actions/relatedDataActions';
import bindIndexToActionCreators from '../actions/bindIndexToActionCreators';


var wrappedRelatedDataActionCreators =
	targetKey =>
		dispatch =>
			bindActionCreators(
				bindIndexToActionCreators(relatedDataActionCreators, targetKey),
				dispatch
			);

class RelatedDataList extends Component {

	render() {

		const props = this.props;
		const parentIndex = props.parentIndex;
		const relatedDataKeyList = props.relatedDataKeyList;
		const relatedDataSet = props.relatedDataSet;

		//https://stackoverflow.com/questions/35685290/context-and-variable-scope-in-es6-loops-and-foreach
		// Use arrow function here to retain 'this' context (lexical scoping)

		return (
			<div>

				<AddButton headerLabel={'Related Data: '}
					clickHandler={() => {
						// !!! this way of key generation will have collisions when a key is deleted and a new one is added
						const targetKey = parentIndex + '' + relatedDataKeyList.length;
						props.addRelatedData(targetKey);
						props.addRelatedDataKey(targetKey);
					}}
				/>

				{relatedDataKeyList.map((relatedDataKey) => {
					return (<div key={'relatedData_' + relatedDataKey}>
						<RelatedData
							targetKey={relatedDataKey}
							relatedData={relatedDataSet[relatedDataKey]}
							{...wrappedRelatedDataActionCreators(relatedDataKey)(props.dispatch)}
						/>

						<RemoveButton
							clickHandler={() => {
								props.removeRelatedData(relatedDataKey);
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
	}
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

