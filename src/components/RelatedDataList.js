import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import { Button } from 'react-bootstrap';

import * as relatedDataListActionCreators from '../actions/relatedDataListActions';

import RelatedData from './RelatedData';
import * as relatedDataActionCreators from '../actions/relatedDataActions';
import bindIndexToActionCreators from '../actions/bindIndexToActionCreators';


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
		const relatedDataList = props.relatedDataList;

		//https://stackoverflow.com/questions/35685290/context-and-variable-scope-in-es6-loops-and-foreach
		// Use arrow function here to retain 'this' context (lexical scoping)

		return (
			<div>
				<h2> {'Related Data: '}
					<Button bsStyle="success" type="button" onClick={props.addRelatedData}>
						{' + '}
					</Button>
				</h2>

				{relatedDataList.map((relatedData, index) => {
					return (<div key={'relatedData' + index}>
						<RelatedData
							index={index}
							relatedData={relatedData}
							{...wrappedRelatedDataActionCreators(index)(props.dispatch)}
						/>
						<h2>
							<Button bsStyle="danger" bsSize="small" type="button"
								onClick={() => props.removeRelatedData(index)}
							>
								{' - '}
							</Button>
						</h2>
					</div>);
				})}

			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		relatedDataList: state.relatedDataList
	}
}

function mapDispatchToProps(dispatch){
	// Bind 'dispatch' to multiple action creators
	// https://github.com/reactjs/redux/issues/363
	return {
		dispatch,
		...bindActionCreators(
			Object.assign({}, relatedDataListActionCreators),
			dispatch
		)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RelatedDataList);
