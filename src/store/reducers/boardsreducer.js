import { v4 as uuidv4 } from 'uuid';
//import * as types from '../../../store/types';
import * as types from '../types';
const initialState = {
	boards: [],
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_NEW_BOARD:
			if (action.name === '') {
				return {
					...state,
				};
			}
			const newBoard = {
				name: action.userBoardName,
				id: uuidv4(),
				background: '',
			};

			const newBoards = [...state.boards, newBoard];
			const newState = {
				...state,
				boards: newBoards,
			};

			const columnId = uuidv4();
			newState[newBoard.id] = {
				cards: {
					'card-1': {
						id: 'card-1',
						title: 'Go out',
						labels: [],
						comments: [],
						description: '',
						todolist: [],
					},
				},
				columns: {
					[columnId]: {
						id: columnId,
						title: 'Your column title',
						cardsIds: ['card-1'],
					},
				},
				columnOrder: [columnId],
				backgrounds: {
					regular: '',
				},
			};

			return {
				...newState,
			};

		case types.ADD_NEW_CARD:
			if (action.cardTitle === '') return;
			const currentBoard = { ...state[action.boardId] };
			const newCardId = uuidv4();
			const newCards = {
				...currentBoard.cards,
				[newCardId]: {
					id: newCardId,
					title: action.cardTitle,
					labels: [],
					comments: [],
					description: '',
					todolist: [],
				},
			};
			currentBoard.cards = newCards;

			const newColumnCardsArray = {
				[action.columnId]: {
					...currentBoard.columns[action.columnId],
					cardsIds: [
						...currentBoard.columns[action.columnId].cardsIds,
						newCardId,
					],
				},
			};
			currentBoard.columns = {
				...currentBoard.columns,
				...newColumnCardsArray,
			};

			return {
				...state,
				[action.boardId]: { ...currentBoard },
			};
		case types.REMOVE_CARD:
			const cardsCopy = { ...state[action.boardId].cards };
			delete cardsCopy[action.cardId];
			const columnCardId = [
				...state[action.boardId].columns[action.columnId].cardsIds,
			];
			const newColumnCardIds = columnCardId.filter(
				(card) => card !== action.cardId
			);

			return {
				...state,
				[action.boardId]: {
					...state[action.boardId],
					cards: cardsCopy,
					columns: {
						...state[action.boardId].columns,
						[action.columnId]: {
							...state[action.boardId].columns[action.columnId],
							cardsIds: newColumnCardIds,
						},
					},
				},
			};
		case types.SET_BACKGROUND_IMAGE:
			return {
				...state,
				boards: [
					...state.boards.map((board) =>
						board.id === action.boardId
							? { ...board, background: action.smallUrl }
							: { ...board }
					),
				],
				[action.boardId]: {
					...state[action.boardId],
					backgrounds: {
						small: action.smallUrl,
						regular: action.regularUrl,
					},
				},
			};
		case types.CHANGE_COLUMN_TITLE:
			const columnClone = {
				...state[action.boardId].columns[action.columnId],
			};
			columnClone.title = action.newColumnTitle;

			return {
				...state,
				[action.boardId]: {
					...state[action.boardId],
					columns: {
						...state[action.boardId].columns,
						[action.columnId]: {
							...columnClone,
						},
					},
				},
			};
		case types.REMOVE_COLUMN:
			const boardColumns = { ...state[action.boardId].columns };
			delete boardColumns[`${action.columnId}`];

			const orderCopy = [...state[action.boardId].columnOrder];
			const columnIndex = orderCopy.findIndex((c) => c === action.columnId);
			orderCopy.splice(columnIndex, 1);

			return {
				...state,
				[action.boardId]: {
					...state[action.boardId],
					columns: boardColumns,
					columnOrder: orderCopy,
				},
			};

		case types.ADD_NEW_COLUMN:
			if (action.columnTitle === '') return { ...state };
			const newColumnId = uuidv4();

			const columnObject = {
				id: newColumnId,
				title: action.columnTitle,
				cardsIds: [],
			};

			const newColumntOrder = [
				...state[action.boardId].columnOrder,
				newColumnId,
			];
			return {
				...state,
				[action.boardId]: {
					...state[action.boardId],
					columns: {
						...state[action.boardId].columns,
						[newColumnId]: {
							...columnObject,
						},
					},
					columnOrder: [...newColumntOrder],
				},
			};

		case types.ON_DRAG_END:
			const { destination, source, draggableId, type } = action.result;

			if (!destination) return { ...state };
			if (
				destination.droppableId === source.droppableId &&
				destination.index === source.index
			)
				return { ...state };

			if (type === 'column') {
				const newColumnOrder = [...state[action.boardId].columnOrder];
				newColumnOrder.splice(source.index, 1);
				newColumnOrder.splice(destination.index, 0, draggableId);

				return {
					...state,
					[action.boardId]: {
						...state[action.boardId],
						columnOrder: newColumnOrder,
					},
				};
			}
			let columnsCopy = { ...state[action.boardId].columns };

			const startColumn = columnsCopy[source.droppableId];
			const finishColumn = columnsCopy[destination.droppableId];

			startColumn.cardsIds.splice(source.index, 1);
			finishColumn.cardsIds.splice(destination.index, 0, draggableId);

			columnsCopy = {
				[startColumn.id]: { ...startColumn },
				[finishColumn.id]: { ...finishColumn },
			};

			return {
				...state,
				[action.boardId]: {
					...state[action.boardId],
					columns: {
						...state[action.boardId].columns,
						...columnsCopy,
					},
				},
			};

		case types.ADD_NEW_COMMENT:
			const { boardId, cardId, commentContent } = action;
			if (commentContent === '') return { ...state };
			const cardCopy = { ...state[boardId].cards[cardId] };
			const newComment = {
				id: uuidv4(),
				content: commentContent,
			};
			cardCopy.comments.push(newComment);
			cardCopy.comments.reverse();

			return {
				...state,
				[boardId]: {
					...state[boardId],
					cards: {
						...state[boardId].cards,
						[cardId]: cardCopy,
					},
				},
			};

		case types.REMOVE_COMMENT: {
			const { boardId, commentId, cardId } = action;
			const cardCopy = { ...state[boardId].cards[cardId] };
			const commentIndex = cardCopy.comments.findIndex(
				(comment) => comment.id === commentId
			);
			cardCopy.comments.splice(commentIndex, 1);

			return {
				...state,
				[boardId]: {
					...state[boardId],
					cards: {
						...state[boardId].cards,
						[cardId]: cardCopy,
					},
				},
			};
		}
		default:
			return {
				...state,
			};
	}
};

export default reducer;
