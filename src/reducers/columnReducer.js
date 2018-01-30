import * as _ from 'lodash';

export default function(state = [], action) {
	const nextState = _.cloneDeep(state);
	switch(action.type) {
		case 'ADD_COLUMN_DATA':
			nextState.push({
				column: '',
				picklistName: '',
				parentColumns: '',
				relatedData: []
			});
			return nextState;

		case 'REMOVE_COLUMN_DATA':
			_.remove(nextState, (value, index) => {
				return index === action.targetIndex;
			});
			return nextState;

		case 'SET_LETTER':
			_.set(nextState, `[${action.targetIndex}].column`, action.letter);
			return nextState;

		case 'SET_PICKLIST_NAME':
			_.set(nextState, `[${action.targetIndex}].picklistName`, action.picklistName);
			return nextState;

		case 'SET_PARENT_LETTERS':
			_.set(nextState, `[${action.targetIndex}].parentColumns`, action.parentColumns);
			return nextState;

		// Related Data
		case 'ADD_RELATED_DATA':
			nextState[action.parentIndex].relatedData.push({
				name: '',
				relatedColumn: ''
			});
			return nextState;
		case 'REMOVE_RELATED_DATA':
			_.remove(nextState[action.parentIndex].relatedData, (value, index) => {
				return index === action.targetIndex;
			});
			return nextState;

		case 'SET_RELATED_DATA_NAME':
			_.set(nextState, `[${action.parentIndex}].relatedData[${action.targetIndex}].name`, action.name);
			return nextState;

		case 'SET_RELATED_DATA_LETTER':
			_.set(nextState, `[${action.parentIndex}].relatedData[${action.targetIndex}].relatedColumn`, action.letter);
			return nextState;


		default:
			break;
	}
	return state;
}
