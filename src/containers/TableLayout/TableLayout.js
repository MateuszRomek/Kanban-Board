import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
//import { initialState } from './initialState';
import GlobalStyle from '../../assets/styles/GlobalStyle';
import Navigation from '../../components/Navigation/Navigation';
import SideMenu from '../../components/SideMenu/SideMenu';
import BoardsContainer from '../../components/BoardsContainer/BoardsContainer';

import useCount from '../../customHooks/useRenderCount';
import { connect } from 'react-redux';
import * as actions from '../../components/SideMenu/duck/actions';

const MainContainer = styled.div`
	width: 100vw;
	height: 100vh;
	background: ${(props) =>
		props.background
			? `url("${props.background}") no-repeat`
			: 'url("https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80") no-repeat'};
	background-size: cover;
	background-position: center center;
	overflow: hidden;
`;

const ContentContainer = styled.div`
	padding-top: 5rem;
	height: 100%;
	position: relative;
`;

function TableLayout(props) {
	const { selectedImage, onModalClose } = props;
	const [isMenuOpen, setModal] = useState(false);
	const [currentBoard, setCurrentBoard] = useState(null);

	const boardName = props.location.hash.slice(1);

	useEffect(() => {
		const boardId = props.location.search.split('=')[1];
		setCurrentBoard(props.boards[boardId]);
	}, [props.boards, props.location.search]);

	const openModal = () => setModal(true);
	const closeModal = () => {
		setModal(false);
		onModalClose();
	};

	useCount();

	return (
		<div className="App">
			<GlobalStyle />
			<Navigation
				boardName={boardName}
				openModal={openModal}
				isMenuOpen={isMenuOpen}
			/>
			<MainContainer background={selectedImage}>
				<ContentContainer>
					<SideMenu isMenuOpen={isMenuOpen} closeModal={closeModal} />
					{currentBoard && typeof currentBoard === 'object' && (
						<BoardsContainer currentBoard={currentBoard} />
					)}
				</ContentContainer>
			</MainContainer>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		boards: state.BoardsReducer,
		selectedImage: state.SideMenuReducer.selectedImage,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onModalClose: () => dispatch(actions.resetImageList()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableLayout);
