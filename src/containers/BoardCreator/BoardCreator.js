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
	background-color: #2980b9;
`;

const AppHeader = styled.h1`
	font-family: 'Courgette';
	font-weight: bold;
	margin: 0;
	text-align: center;
	color: rgb(232, 232, 232);
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
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: auto;
	}
`;

const BoardsHome = ({ state }) => {
	const userBoards = state.boards.map((board) => (
		<Link
			key={board.id}
			to={{
				pathname: '/board',
				search: `?name=${board.id}`,
				hash: `#${board.name}`,
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
		state: state.BoardsReducer,
	};
};

export default connect(mapStateToProps)(BoardsHome);
