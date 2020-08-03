import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyle from '../../assets/styles/GlobalStyle';
import Navigation from '../../components/Navigation/Navigation';
import SideMenu from '../../components/SideMenu/SideMenu';
import BoardsContainer from '../../components/BoardsContainer/BoardsContainer';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import useBoardIdFromUrl from '../../customHooks/useBoardIdFromUrl';
import { Redirect } from 'react-router-dom';
import ModalContextProvider from '../../context/ModalContext';
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
	const { onSideMenuClose } = props;
	const [isMenuOpen, setMenu] = useState(false);
	const [currentBoard, setCurrentBoard] = useState(null);
	const boardId = useBoardIdFromUrl(props.location);
	const isBoardArrayEmpy = props.boards.boards.length === 0;
	const closeModal = () => {
		setMenu(false);
		onSideMenuClose();
	};
	const openModal = () => setMenu(true);
	const boardData = props.boards.boards.find(({ id }) => {
		return id === boardId;
	});
	const boardName = boardData ? boardData.name : 'null';

	useEffect(() => {
		setCurrentBoard(props.boards[boardId]);
	}, [boardId, props.boards]);

	return (
		<div className="App">
			{isBoardArrayEmpy && <Redirect to={'/'} />}
			<GlobalStyle />
			<Navigation
				openModal={openModal}
				boardName={boardName}
				isMenuOpen={isMenuOpen}
			/>
			<ModalContextProvider>
				<MainContainer
					background={currentBoard ? currentBoard.backgrounds.regular : null}
				>
					<ContentContainer>
						<SideMenu isMenuOpen={isMenuOpen} closeModal={closeModal} />
						{currentBoard && typeof currentBoard === 'object' && (
							<BoardsContainer boardId={boardId} currentBoard={currentBoard} />
						)}
					</ContentContainer>
				</MainContainer>
			</ModalContextProvider>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		boards: state.BoardsReducer,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onSideMenuClose: () => dispatch(actions.resetImageList()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableLayout);
