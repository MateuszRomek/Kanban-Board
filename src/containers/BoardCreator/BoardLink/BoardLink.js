import React from 'react';
import styled from 'styled-components';
const BoardContainer = styled.div`
	width: 24rem;
	height: 14rem;
	background-color: white;
	transform: scale(0.9);
	box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
	transition: transform 0.3s ease-in-out;
	border-radius: 3px;
	overflow: hidden;
	font-family: inherit;
	margin: 0.8rem;
	color: ${(props) => (props.background ? 'white' : 'black')};
	background: ${(props) =>
		props.background
			? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),url("${props.background}") no-repeat`
			: null};
	background-size: cover;
	background-position: center center;
	@media (min-width: 320px) and (max-width: 480px) {
		width: 100%;
		height: 11rem;
		transform: none; 
		margin: 1rem 0;
		&:hover {
		transform: none; 
		}
		}
	}
	&:hover {
		transform: scale(1);
	}
`;

const BoardTitle = styled.p`
	font-size: 2.4rem;
	padding: 1rem 0.9rem 3rem;
	margin: 0;
	color: inherit;

	@media (min-width: 320px) and (max-width: 480px) {
		font-size: 2.1rem;
	}
`;

const Board = ({ title, background }) => {
	return (
		<BoardContainer background={background}>
			<BoardTitle>{title}</BoardTitle>
		</BoardContainer>
	);
};

export default Board;
