import types from './types';

const addNewCard = (cardTitle, boardId, columnId) => {
	return {
		type: types.ADD_NEW_CARD,
		cardTitle,
		boardId,
		columnId,
	};
};

export default {
	addNewCard,
};
