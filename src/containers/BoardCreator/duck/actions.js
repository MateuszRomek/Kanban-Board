import types from './types';
const createNewBoard = (userBoardName) => {
	return {
		type: types.ADD_NEW_BOARD,
		userBoardName,
	};
};

const selectBackgroundImage = (regularUrl, smallUrl, boardId) => {
	return {
		type: types.SET_BACKGROUND_IMAGE,
		regularUrl,
		smallUrl,
		boardId,
	};
};

const changeColumnTitle = (newColumnTitle, boardId, columnId) => {
	return {
		type: types.CHANGE_COLUMN_TITLE,
		newColumnTitle,
		boardId,
		columnId,
	};
};

const onDragEnd = (result, boardId) => {
	return {
		type: types.ON_DRAG_END,
		result,
		boardId,
	};
};

export default {
	createNewBoard,
	selectBackgroundImage,
	changeColumnTitle,
	onDragEnd,
};
