export const addColumn = () => {
	return {
		type: 'ADD_COLUMN_DATA'
	};
}

export const removeColumn = (targetIndex) => {
	return {
		type: 'REMOVE_COLUMN_DATA',
		targetIndex: targetIndex
	};
}

export const setLetter = (targetIndex, letter) => {
	return {
		type: 'SET_LETTER',
		targetIndex,
		letter
	};
}
export const setPicklistName = (targetIndex, picklistName) => {
	return {
		type: 'SET_PICKLIST_NAME',
		targetIndex,
		picklistName
	};
}
export const setParentLetters = (targetIndex, parentColumns) => {
	return {
		type: 'SET_PARENT_LETTERS',
		targetIndex,
		parentColumns
	};
}

export const addRelatedData = (parentIndex) => {
	return {
		type: 'ADD_RELATED_DATA',
		parentIndex
	};
}
export const removeRelatedData = (parentIndex, targetIndex) => {
	return {
		type: 'REMOVE_RELATED_DATA',
		parentIndex,
		targetIndex
	};
}

export const setRelatedDataName = (parentIndex, targetIndex, name) => {
	return {
		type: 'SET_RELATED_DATA_NAME',
		parentIndex,
		targetIndex,
		name
	};
}
export const setRelatedDataLetter = (parentIndex, targetIndex, letter) => {
	return {
		type: 'SET_RELATED_DATA_LETTER',
		parentIndex,
		targetIndex,
		letter
	};
}
