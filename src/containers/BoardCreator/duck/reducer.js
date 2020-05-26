import { v4 as uuidv4 } from 'uuid';
import types from './types';
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
			};

			const newBoards = [...state.boards, newBoard];
			const newState = {
				...state,
				boards: newBoards,
			};

			//Add to new state our new board object
			newState[newBoard.id] = {
				tasks: {
					'task-1': {
						id: 'task-1',
						title: 'Go out',
						content: 'Take out the garbage',
					},
				},
				columns: {
					'column-1': {
						id: uuidv4(),
						title: '',
						tasksIds: ['task-1'],
					},
				},
				columnOrder: ['column-1'],
			};

			return {
				...newState,
			};

		default:
			return {
				...state,
			};
	}
};

export default reducer;
