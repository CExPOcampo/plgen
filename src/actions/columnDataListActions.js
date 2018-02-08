export const addColumnData = () => {
	return {
		type: 'ADD_COLUMN_DATA'
	};
}

export const removeColumnData = (targetIndex) => {
	return {
		type: 'REMOVE_COLUMN_DATA',
		targetIndex: targetIndex
	};
}
