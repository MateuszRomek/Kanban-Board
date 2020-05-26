import * as types from './types';

export const searchbarChange = (e) => {
	return {
		type: types.SEARCHBAR_CHANGE,
		inputValue: e.target.value,
	};
};

export const resetImageList = () => {
	return {
		type: types.MODAL_RESET_IMAGE_LIST,
	};
};

export const selectBackgroundImage = (imageUrl) => {
	return {
		type: types.SET_BACKGROUND_IMAGE,
		imageUrl,
	};
};

const startFetchBackgroundImg = () => ({
	type: types.REQUEST_PHOTOS_START,
	isFetching: true,
});

const fetchBackgroundImageFail = (error) => ({
	type: types.REQUEST_PHOTOS_FAIL,
	error,
});

const finishFetchBackgroundImg = (data) => ({
	type: types.REQUEST_PHOTOS_FINISH,
	isFetching: false,
	payload: data,
});

export const fetchUnsplash = (e, searchValue) => {
	return (dispatch) => {
		e.preventDefault();
		dispatch(startFetchBackgroundImg());
		return fetch(
			`https://api.unsplash.com/search/collections/?client_id=lF2X9QbJxugtbhXVYRpvK2rMBWrX_4yAgmUQFhWCeGw&query="${searchValue}"`
		)
			.then((res) => res.json())
			.then(({ results }) => dispatch(finishFetchBackgroundImg(results)))
			.catch((err) => {
				dispatch(fetchBackgroundImageFail(err));
				console.log(err);
			});
	};
};
