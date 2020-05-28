import { v4 as uuidv4 } from 'uuid';
import types from './types';
import cardTypes from '../../../components/BoardsContainer/AddNewCard/duck/types';
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

			//Add to new state our new board object
			const columnId = uuidv4();
			newState[newBoard.id] = {
				cards: {
					'card-1': {
						id: 'card-1',
						title: 'Go out',
						content: 'Take out the garbage',
					},
				},
				columns: {
					[columnId]: {
						id: columnId,
						title: 'Your column name',
						cardsIds: ['card-1'],
					},
				},
				columnOrder: [columnId],
				backgrounds: {
					small: '',
					regular: '',
				},
			};

			return {
				...newState,
			};

		case cardTypes.ADD_NEW_CARD:
			if (action.cardTitle === '') return;
			const currentBoard = { ...state[action.boardId] };
			const newCardId = uuidv4();
			const newCards = {
				...currentBoard.cards,
				[newCardId]: {
					id: newCardId,
					title: action.cardTitle,
					content: '',
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
		default:
			return {
				...state,
			};
	}
};

export default reducer;
