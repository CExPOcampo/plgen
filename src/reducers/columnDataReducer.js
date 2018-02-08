import * as _ from 'lodash';

export const INITIAL_STATE = {
	column: '',
	picklistName: '',
	parentColumns: '',
	relatedData: []
}

export default function(state = INITIAL_STATE, action) {

	const nextState = _.cloneDeep(state);

	switch(action.type) {

		case 'columnData/SET_LETTER':
			_.set(nextState, 'column', action.letter);
			return nextState;

		case 'columnData/SET_PICKLIST_NAME':
			_.set(nextState, 'picklistName', action.picklistName);
			return nextState;

		case 'columnData/SET_PARENT_LETTERS':
			_.set(nextState, 'parentColumns', action.parentColumns);
			return nextState;


		default:
			break;
	}
	return state;
}
