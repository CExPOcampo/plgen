import * as _ from 'lodash';
import { INITIAL_STATE as RELATED_DATA_INITIAL_STATE } from './relatedDataReducer';
import relatedDataReducer from './relatedDataReducer';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
	const nextState = _.cloneDeep(state);

	if(action.type.startsWith('relatedData/')) {
		nextState[action.index] = relatedDataReducer(nextState[action.index], action);
		return nextState;
	}

	switch(action.type) {
		case 'ADD_RELATED_DATA':
			nextState[action.targetKey] = RELATED_DATA_INITIAL_STATE;
			return nextState;

		case 'REMOVE_RELATED_DATA':
			return _.omit(nextState, [action.targetKey]);

		default:
			break;
	}

	return state;
}
