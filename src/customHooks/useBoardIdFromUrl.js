const useBoardIdFromUrl = (location) => {
	const firstIndex = location.pathname.indexOf('=');
	const lastIndex = location.pathname.indexOf('/t');
	let boardId;
	if (lastIndex === -1) {
		boardId = location.pathname.substring(firstIndex + 1);
	} else {
		boardId = location.pathname.substring(firstIndex + 1, lastIndex);
	}
	return boardId;
};

export default useBoardIdFromUrl;
