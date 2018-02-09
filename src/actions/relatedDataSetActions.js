export const addRelatedData = (targetKey) => {
	return {
		type: 'ADD_RELATED_DATA',
		targetKey
	};
}

export const removeRelatedData = (targetKey) => {
	return {
		type: 'REMOVE_RELATED_DATA',
		targetKey
	};
}
