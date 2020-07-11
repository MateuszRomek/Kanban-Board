export const findBoardId = (location) => {
	const boardId = location.search.split('=')[1];
	return boardId;
};
