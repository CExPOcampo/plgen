import * as _ from 'lodash';

export default function(
	state = {
		filePrevRef: null,
		tabNum: 0,
		rowRangeStart: 0,
		rowRangeEnd: 0,
	},
	action) {
	const nextState = _.cloneDeep(state);
	switch(action.type) {
		case 'SET_FILE_PREVIEW_REF':
			nextState.filePrevRef = action.filePreviewRef;
			return nextState;
		case 'SET_TAB_NUM':
			nextState.tabNum = action.tabNum;
			return nextState;
		case 'SET_ROW_RANGE_START':
			nextState.rowRangeStart = action.rowRangeStart;
			return nextState;
		case 'SET_ROW_RANGE_END':
			nextState.rowRangeEnd = action.rowRangeEnd;
			return nextState;

		default:
			break;
	}
	return state;
}
