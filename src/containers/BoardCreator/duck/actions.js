import types from './types';
const createNewBoard = (userBoardName) => {
	return {
		type: types.ADD_NEW_BOARD,
		userBoardName,
	};
};

export default { createNewBoard };
