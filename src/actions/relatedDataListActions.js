export const addRelatedData = () => {
	return {
		type: 'ADD_RELATED_DATA'
	};
}

export const removeRelatedData = (targetIndex) => {
	return {
		type: 'REMOVE_RELATED_DATA',
		targetIndex: targetIndex
	};
}
