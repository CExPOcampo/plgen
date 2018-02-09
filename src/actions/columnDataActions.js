
export const setColumnDataLetter = (letter) => {
	return {
		type: 'columnData/SET_LETTER',
		letter
	};
}
export const setColumnDataPicklistName = (picklistName) => {
	return {
		type: 'columnData/SET_PICKLIST_NAME',
		picklistName
	};
}
export const setColumnDataParentLetters = (parentColumns) => {
	return {
		type: 'columnData/SET_PARENT_LETTERS',
		parentColumns
	};
}

export const addRelatedDataKey = (targetKey) => {
	return {
		type: 'columnData/ADD_RELATED_DATA_KEY',
		targetKey
	}
}

export const removeRelatedDataKey = (targetKey) => {
	return {
		type: 'columnData/REMOVE_RELATED_DATA_KEY',
		targetKey
	}
}
