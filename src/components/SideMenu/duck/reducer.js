import * as types from './types';
const initialState = {
	searchBarLoading: false,
	imagesList: [],
	error: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.MODAL_RESET_IMAGE_LIST:
			if (state.imagesList.length === 0) {
				return { ...state };
			}
			return {
				...state,
				imagesList: [],
			};

		case types.REQUEST_PHOTOS_START:
			return {
				...state,
				searchBarLoading: action.isFetching,
			};
		case types.REQUEST_PHOTOS_FINISH:
			return {
				...state,
				searchBarValue: '',
				searchBarLoading: action.isFetching,
				imagesList: [...action.payload],
			};
		case types.REQUEST_PHOTOS_FAIL:
			return {
				...state,
				error: action.error,
			};
		default:
			return {
				...state,
			};
	}
};

export default reducer;
