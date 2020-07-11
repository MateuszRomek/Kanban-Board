import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import BackgroundPreview from './BackgroundPreview/BackgroundPreview';
import Spinner from '../../UI/Spinner/Spinner';

import * as actions from '../../../store/actions';

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

const BackgroundSearch = (props) => {
	const {
		fetchBackground,
		imagesList,
		searchBarLoading,
		error,
		selectBackgroundImage,
	} = props;
	const boardId = props.location.search.split('=')[1];

	const imgList = imagesList.map((image) => {
		const regularUrl = image['preview_photos'][0].urls.regular;
		const smallUrl = image['preview_photos'][0].urls.small;
		return (
			<BackgroundPreview
				click={() => selectBackgroundImage(regularUrl, smallUrl, boardId)}
				key={image.id}
				alt={image.title}
				imgUrl={smallUrl}
			/>
		);
	});

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const searchValue = e.currentTarget.elements[0].value;
		fetchBackground(searchValue);
	};
	return (
		<Container>
			<MenuSection>
				<SearchForm onSubmit={handleFormSubmit}>
					<SearchLabel htmlFor="searchbar">
						Choose your board background
					</SearchLabel>
					<SearchBar
						id="searchbar"
						type="text"
						placeholder="Mountains.."
						autoComplete="off"
					/>
					<SearchButton type="submit">Search</SearchButton>
				</SearchForm>
			</MenuSection>
			<GridContainer>
				{error && <p>{error}</p>}
				{searchBarLoading ? <Spinner isOnGrid={true} /> : imgList}
			</GridContainer>
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		error: state.SideMenuReducer.error,
		imagesList: state.SideMenuReducer.imagesList,
		searchBarLoading: state.SideMenuReducer.searchBarLoading,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBackground: (e, searchValue) =>
			dispatch(actions.fetchUnsplash(e, searchValue)),
		selectBackgroundImage: (regularUrl, smallUrl, boardId) =>
			dispatch(actions.selectBackgroundImage(regularUrl, smallUrl, boardId)),
	};
};

//export default connect(mapStateToProps, mapDispatchToProps)(BackgroundSearch);
export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withRouter
)(BackgroundSearch);
