import React, { Component } from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import { Button } from 'react-bootstrap';

import * as columnDataListActionCreators from '../actions/columnDataListActions';

import TargetColumnData from './TargetColumnData';
import * as columnDataActionCreators from '../actions/columnDataActions';
import bindIndexToActionCreators from '../actions/bindIndexToActionCreators';


var wrappedColumnDataActionCreators =
	index =>
		dispatch =>
			bindActionCreators(
				bindIndexToActionCreators(columnDataActionCreators, index),
				dispatch
			);

class TargetColumnDataList extends Component {

	render() {

		const props = this.props;
		const columnDataList = props.columnDataList;

		//https://stackoverflow.com/questions/35685290/context-and-variable-scope-in-es6-loops-and-foreach
		// Use arrow function here to retain 'this' context (lexical scoping)

		return (
			<div>
				<h2> {'Column Data: '}
					<Button bsStyle="success" type="button" onClick={props.addColumnData}>
						{' + '}
					</Button>
				</h2>

				{columnDataList.map((columnData, index) => {
					return (<div key={'columnData' + index}>
						<TargetColumnData
							index={index}
							columnData={columnData}
							{...wrappedColumnDataActionCreators(index)(props.dispatch)}
						/>
						<h2>
							<Button bsStyle="danger" bsSize="small" type="button"
								onClick={() => props.removeColumnData(index)}
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

export default connect(mapStateToProps, mapDispatchToProps)(TargetColumnDataList);
