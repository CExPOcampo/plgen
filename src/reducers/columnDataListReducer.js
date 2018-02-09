import * as _ from 'lodash';
import { INITIAL_STATE as COLUMN_DATA_INITIAL_STATE } from './columnDataReducer';
import columnDataReducer from './columnDataReducer';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action) {
	const nextState = _.cloneDeep(state);

	if(action.type.startsWith('columnData/')) {
		nextState[action.index] = columnDataReducer(nextState[action.index], action);
		return nextState;
	}

	switch(action.type) {
		case 'ADD_COLUMN_DATA':
			nextState.push(COLUMN_DATA_INITIAL_STATE);
			return nextState;

		case 'REMOVE_COLUMN_DATA':
			_.remove(nextState, (value, index) => {
				return index === action.targetIndex;
			});
			return nextState;

		default:
			break;
	}

	return state;
}
