import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import GlobalStyle from '../../assets/styles/GlobalStyle';
import Navigation from '../../components/Navigation/Navigation';
import SideMenu from '../../components/SideMenu/SideMenu';
import BoardsContainer from '../../components/BoardsContainer/BoardsContainer';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Modal from '../../components/UI/Modal/Modal';
import useBoardIdFromUrl from '../../customHooks/useBoardIdFromUrl';
import { Redirect } from 'react-router-dom';
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
	const { onModalClose } = props;
	const [isMenuOpen, setMenu] = useState(false);
	const [isModalOpen, setModal] = useState(false);
	const [currentBoard, setCurrentBoard] = useState(null);
	const boardId = useBoardIdFromUrl(props.location);
	const isBoardArrayEmpy = props.boards.boards.length === 0;
	const handleModalChange = () => setModal(!isModalOpen);
	const openModal = useCallback(() => setMenu(true), []);
	const closeModal = () => {
		setMenu(false);
		onModalClose();
	};

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
				test={handleModalChange}
				boardName={boardName}
				openModal={openModal}
				isMenuOpen={isMenuOpen}
			/>
			<Modal handleModalChange={handleModalChange} isOpen={isModalOpen} />
			<MainContainer
				background={currentBoard ? currentBoard.backgrounds.regular : null}
			>
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
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onModalClose: () => dispatch(actions.resetImageList()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableLayout);
