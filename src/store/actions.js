import * as types from './types';

export const resetImageList = () => {
	return {
		type: types.MODAL_RESET_IMAGE_LIST,
	};
};

const startFetchBackgroundImg = () => ({
	type: types.REQUEST_PHOTOS_START,
	isFetching: true,
});

const fetchBackgroundImageFail = (error) => ({
	type: types.REQUEST_PHOTOS_FAIL,
	isFetching: false,
	error,
	payload: [],
});

const finishFetchBackgroundImg = (data) => ({
	type: types.REQUEST_PHOTOS_FINISH,
	isFetching: false,
	payload: data,
});

export const fetchUnsplash = (searchValue) => {
	return (dispatch) => {
		dispatch(startFetchBackgroundImg());
		return fetch(
			`https://api.unsplash.com/search/collections/?client_id=lF2X9QbJxugtbhXVYRpvK2rMBWrX_4yAgmUQFhWCeGw&query="${searchValue}"`
		)
			.then((res) => res.json())
			.then(({ results }) => {
				if (results.length === 0) {
					dispatch(fetchBackgroundImageFail('Nothing found'));
				} else {
					dispatch(finishFetchBackgroundImg(results));
				}
			})
			.catch((err) => {
				dispatch(fetchBackgroundImageFail(err));
				console.log(err);
			});
	};
};

export const addNewCard = (cardTitle, boardId, columnId) => {
	return {
		type: types.ADD_NEW_CARD,
		cardTitle,
		boardId,
		columnId,
	};
};
export const removeCard = (boardId, cardId, columnId) => {
	return {
		type: types.REMOVE_CARD,
		boardId,
		cardId,
		columnId,
	};
};
export const createNewBoard = (userBoardName) => {
	return {
		type: types.ADD_NEW_BOARD,
		userBoardName,
	};
};

export const selectBackgroundImage = (regularUrl, smallUrl, boardId) => {
	return {
		type: types.SET_BACKGROUND_IMAGE,
		regularUrl,
		smallUrl,
		boardId,
	};
};

export const changeColumnTitle = (newColumnTitle, boardId, columnId) => {
	return {
		type: types.CHANGE_COLUMN_TITLE,
		newColumnTitle,
		boardId,
		columnId,
	};
};

export const removeColumn = (boardId, columnId) => {
	return {
		type: types.REMOVE_COLUMN,
		columnId,
		boardId,
	};
};

export const onDragEnd = (result, boardId) => {
	return {
		type: types.ON_DRAG_END,
		result,
		boardId,
	};
};

export const addNewColumn = (boardId, columnTitle) => {
	return {
		type: types.ADD_NEW_COLUMN,
		boardId,
		columnTitle,
	};
};

export const addNewComment = (cardId, boardId, commentContent) => {
	return {
		type: types.ADD_NEW_COMMENT,
		cardId,
		boardId,
		commentContent,
	};
};

export const removeComment = (commentId, boardId, cardId) => {
	return {
		type: types.REMOVE_COMMENT,
		commentId,
		boardId,
		cardId,
	};
};

export const setCardDataOnModalClose = (
	boardId,
	cardId,
	title,
	description,
	todolist
) => {
	return {
		type: types.SET_CARD_DATA_ON_CLOSE,
		boardId,
		cardId,
		title,
		description,
		todolist,
	};
};

export const addNewTodo = (boardId, cardId, toDoItem) => {
	return {
		type: types.ADD_NEW_TODO,
		boardId,
		cardId,
		toDoItem,
	};
};

export const changeCheckedTodo = (boardId, cardId, toDoId) => {
	return {
		type: types.CHECK_CHANGE_TODO,
		boardId,
		cardId,
		toDoId,
	};
};

export const removeToDoItem = (boardId, cardId, toDoId) => {
	return {
		type: types.REMOVE_TODO,
		boardId,
		cardId,
		toDoId,
	};
};

export const editLabel = (boardId, labelId, labelContent) => {
	return {
		type: types.EDIT_LABEL,
		boardId,
		labelId,
		labelContent,
	};
};

export const toggleLabelToTask = (boardId, cardId, labelId) => {
	return {
		type: types.TOGGLE_LABEL_TO_TASK,
		boardId,
		cardId,
		labelId,
	};
};
