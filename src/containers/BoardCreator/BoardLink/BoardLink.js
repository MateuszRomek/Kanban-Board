import React from 'react';
import styled from 'styled-components';
const BoardContainer = styled.div`
	width: 18rem;
	height: 11rem;
	background-color: white;
	transform: scale(0.9);
	box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
	transition: transform 0.3s ease-in-out;
	border-radius: 3px;
	font-family: inherit;
	margin: 0.8rem;
	@media (min-width: 320px) and (max-width: 480px) {
		width: 16rem;
		height: 9rem;
	}
	&:hover {
		transform: scale(1);
	}
`;

const BoardTitle = styled.p`
	font-size: 2.4rem;
	padding: 1rem 0.7rem 3rem;
	margin: 0;
	color: black;

	@media (min-width: 320px) and (max-width: 480px) {
		font-size: 2.1rem;
	}
`;

const Board = ({ title }) => {
	return (
		<BoardContainer>
			<BoardTitle>{title}</BoardTitle>
		</BoardContainer>
	);
};

export default Board;
