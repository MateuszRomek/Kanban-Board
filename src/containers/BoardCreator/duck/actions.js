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

export default { createNewBoard, selectBackgroundImage };
