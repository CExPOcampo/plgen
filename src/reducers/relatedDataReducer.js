import * as _ from 'lodash';

export const INITIAL_STATE = {
	name: '',
	relatedColumn: ''
}

export default function(state = INITIAL_STATE, action) {

	const nextState = _.cloneDeep(state);

	switch(action.type) {

		case 'relatedData/SET_RELATED_DATA_NAME':
			_.set(nextState, 'name', action.name);
			return nextState;

		case 'relatedData/SET_RELATED_DATA_LETTER':
			_.set(nextState, 'relatedColumn', action.letter);
			return nextState;

		default:
			break;
	}
	return state;
}
