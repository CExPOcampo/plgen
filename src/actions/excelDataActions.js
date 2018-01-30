
export const setFilePreviewRef = (filePreviewRef) => {
	return {
		type: 'SET_FILE_PREVIEW_REF',
		filePreviewRef
	};
}
export const setTabNum = (tabNum) => {
	return {
		type: 'SET_TAB_NUM',
		tabNum
	};
}
export const setRowRangeStart = (rowRangeStart) => {
	return {
		type: 'SET_ROW_RANGE_START',
		rowRangeStart
	};
}
export const setRowRangeEnd = (rowRangeEnd) => {
	return {
		type: 'SET_ROW_RANGE_END',
		rowRangeEnd
	};
}
