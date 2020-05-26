import React from 'react';
import styled from 'styled-components';

import BackgroundPreview from './BackgroundPreview/BackgroundPreview';
import Spinner from '../../UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../duck/actions';

const Container = styled.div`
	background-color: white;
	height: 100%;
`;

const MenuSection = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem 1.2rem;
	border-bottom: 1px solid #bdc3c7;
`;

const SearchBar = styled.input`
	display: inline-block;
	font-size: 1.4rem;
	padding: 0.8rem 1.6rem;
	border: 1px solid #bdc3c7;
`;

const SearchForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const SearchLabel = styled.label`
	display: inline-block;
	margin-bottom: 0.6rem;
	font-size: 1.7rem;
`;
const SearchButton = styled.button`
	margin-top: 0.8rem;
	padding: 0.3rem 1rem;
	text-transform: uppercase;
	background-color: transparent;
	border: 1px solid #bdc3c7;
	color: inherit;
	transition: all 0.3s;
	&:hover {
		color: white;
		background-color: rgba(75, 101, 132, 0.7);
		border-color: rgba(75, 101, 132, 0.1);
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
	}
	&:focus {
		border-color: rgba(75, 101, 132, 0.1);
		outline: none;
	}
	&:active {
		border-color: rgba(75, 101, 132, 0.1);
		outline: none;
	}
`;

const GridContainer = styled.div`
	padding-top: 1.5rem;
	display: grid;
	grid-column-gap: 1rem;
	grid-row-gap: 0.8rem;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 95px;
	grid-auto-rows: 95px;
`;

const BackgroundSearch = ({
	searchValue,
	onSearchBarChange,
	fetchBackground,
	imagesList,
	searchBarLoading,
	error,
	selectBackgroundImage,
}) => {
	const imgList = imagesList.map((image) => {
		const regularUrl = image['preview_photos'][0].urls.regular;
		const url = image['preview_photos'][0].urls.small;

		return (
			<BackgroundPreview
				click={() => selectBackgroundImage(regularUrl)}
				key={image.id}
				alt={image.title}
				imgUrl={url}
			/>
		);
	});

	return (
		<Container>
			<MenuSection>
				<SearchForm onSubmit={(e) => fetchBackground(e, searchValue)}>
					<SearchLabel htmlFor="searchbar">
						Choose your board background
					</SearchLabel>
					<SearchBar
						value={searchValue}
						onChange={onSearchBarChange}
						id="searchbar"
						type="text"
						placeholder="Mountains.."
						autoComplete="off"
					/>
					<SearchButton type="submit">Search</SearchButton>
				</SearchForm>
			</MenuSection>
			<GridContainer>
				{searchBarLoading ? <Spinner isOnGrid={true} /> : imgList}
			</GridContainer>
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		searchValue: state.SideMenuReducer.searchBarValue,
		error: state.SideMenuReducer.error,
		imagesList: state.SideMenuReducer.imagesList,
		searchBarLoading: state.SideMenuReducer.searchBarLoading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onSearchBarChange: (e) => dispatch(actions.searchbarChange(e)),
		fetchBackground: (e, searchValue) =>
			dispatch(actions.fetchUnsplash(e, searchValue)),
		selectBackgroundImage: (imageUrl) =>
			dispatch(actions.selectBackgroundImage(imageUrl)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundSearch);
