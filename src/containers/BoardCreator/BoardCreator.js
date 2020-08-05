import React from 'react';
import styled from 'styled-components';
import BoardLink from './BoardLink/BoardLink';
import CreateBoard from './CreateBoard/CreateBoard';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GlobalStyle from '../../assets/styles/GlobalStyle';
const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: #6190e8;
`;

const AppHeader = styled.h1`
	font-family: 'Courgette';
	font-weight: bold;
	margin: 0;
	text-align: center;
	color: rgb(232, 232, 232);
	text-shadow: 2px 2px 5px rgb(51, 51, 51);
	font-style: italic;
	padding: 1rem 0;
`;
const BoardsInfo = styled.div`
	display: flex;
	padding: 1rem 1.5rem;
	flex-direction: column;
`;
const BoardsHeader = styled.h2`
	color: rgb(232, 232, 232);
	margin-left: 2rem;
	text-shadow: 2px 2px 5px rgb(51, 51, 51);
`;

const BoardsContainer = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: flex-start;
	@media (min-width: 320px) and (max-width: 480px) {
		display: grid;
		align-items: center;
		justify-content: center;
		grid-template-columns: 1fr;
		grid-template-rows: auto;
	}
`;

const BoardsHome = ({ state }) => {
	const userBoards = state.map((board) => (
		<Link
			key={board.id}
			to={{
				pathname: `/board/name=${board.id}`,
			}}
			style={{ textDecoration: 'none' }}
		>
			<BoardLink background={board.background} title={board.name} />
		</Link>
	));

	return (
		<Container>
			<GlobalStyle />

			<AppHeader>My Kanban Board</AppHeader>
			<BoardsInfo>
				<BoardsHeader>Select your board!</BoardsHeader>
				<BoardsContainer>
					{userBoards}
					<CreateBoard />
				</BoardsContainer>
			</BoardsInfo>
		</Container>
	);
};

const mapStateToProps = (state) => {
	return {
		state: state.BoardsReducer.boards,
	};
};

export default connect(mapStateToProps)(BoardsHome);
