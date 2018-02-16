
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
export const setColumnDataRank = (rank) => {
	return {
		type: 'columnData/SET_RANK',
		rank
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

export const setHasParent = (hasParent) => {
	return {
		type: 'columnData/SET_HAS_PARENT',
		hasParent
	}
}
export const setHasRelatedData = (hasRelatedData) => {
	return {
		type: 'columnData/SET_HAS_RELATED_DATA',
		hasRelatedData
	}
}
export const setHasRank = (hasRank) => {
	return {
		type: 'columnData/SET_HAS_RANK',
		hasRank
	}
}
