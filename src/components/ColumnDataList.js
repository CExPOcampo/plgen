import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import AddButton from './AddButton';
import RemoveButton from './RemoveButton';

import * as columnDataListActionCreators from '../actions/columnDataListActions';

import ColumnData from './ColumnData';
import * as columnDataActionCreators from '../actions/columnDataActions';
import bindIndexToActionCreators from '../actions/bindIndexToActionCreators';

import RelatedDataSet from './RelatedDataSet';

var wrappedColumnDataActionCreators =
	index =>
		dispatch =>
			bindActionCreators(
				bindIndexToActionCreators(columnDataActionCreators, index),
				dispatch
			);

class ColumnDataList extends Component {

	render() {

		const props = this.props;
		const columnDataList = props.columnDataList;

		//https://stackoverflow.com/questions/35685290/context-and-variable-scope-in-es6-loops-and-foreach
		// Use arrow function here to retain 'this' context (lexical scoping)

		return (
			<div>

				<AddButton headerLabel={'Column Data: '} clickHandler={props.addColumnData}/>

				{columnDataList.map((columnData, index) => {
					return (<div key={'columnData' + index}>
						<ColumnData
							index={index}
							columnData={columnData}
							{...wrappedColumnDataActionCreators(index)(props.dispatch)}
						/>

						<RemoveButton clickHandler={() => props.removeColumnData(index)}/>

						<div style={{paddingLeft: '5em'}}>
							<RelatedDataSet
								parentIndex={index}
								relatedDataKeyList={columnData.relatedDataKeys}
								{...wrappedColumnDataActionCreators(index)(props.dispatch)}
							/>
						</div>

					</div>);
				})}

			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		columnDataList: state.columnDataList
	}
}

// expose dispatch function to props
//https://github.com/reactjs/react-redux/issues/255
function mapDispatchToProps(dispatch){
	// Bind 'dispatch' to multiple action creators
	// https://github.com/reactjs/redux/issues/363
	return {
		dispatch,
		...bindActionCreators(
			Object.assign({}, columnDataListActionCreators),
			dispatch
		)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ColumnDataList);
