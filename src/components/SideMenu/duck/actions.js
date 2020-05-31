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
	error,
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
			.then(({ results }) => dispatch(finishFetchBackgroundImg(results)))
			.catch((err) => {
				dispatch(fetchBackgroundImageFail(err));
				console.log(err);
			});
	};
};
