import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import React from 'react';
import styled from 'styled-components';
import NavButton from '../UI/Buttons/NavButton/NavButton';
import { Link } from 'react-router-dom';

const NavigationContainer = styled.nav`
	padding: 0 1rem;
	background: rgba(0, 0, 0, 0.2);
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	z-index: 100;
	width: 100%;
	height: 5rem;
	@media (min-width: 320px) and (max-width: 480px) {
		padding: 1rem 1rem;
	}
`;

const MainHeader = styled.h2`
	font-style: italic;
	font-family: 'Courgette';
	margin: 1rem 0;
	color: white;
	opacity: 0.7;
	@media (min-width: 320px) and (max-width: 480px) {
		display: none;
	}
`;

const CurrentTable = styled.span`
	text-align: center;
	display: inline-block;
	color: white;
	padding: 0.5rem 0.5rem;
	font-size: 1.4rem;
	background-color: hsla(0, 0%, 100%, 0.1);
	border-radius: 5px;
	min-height: 2.7rem;
	min-width: 2.7rem;
`;

const GoHome = styled.div`
	height: 2.7rem;
	width: 2.7rem;
	padding: 0.5rem;
	display: inline-block;
	max-width: 3rem;
	background-color: hsla(0, 0%, 100%, 0.1);
	border-radius: 5px;
	margin: 0 1rem;
	& svg {
		width: 100%;
		height: 100%;
		color: white;
	}
`;

const FlexAlign = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
`;

const Navigation = (props) => {
	return (
		<header>
			<NavigationContainer>
				<FlexAlign>
					<Link to="/">
						<GoHome>
							<HomeIcon />
						</GoHome>
					</Link>
					<CurrentTable>{props.boardName}</CurrentTable>
					<NavButton isMargin={true}>Boards</NavButton>
				</FlexAlign>
				<div>
					<MainHeader>My Kanban Board</MainHeader>
				</div>
				<div>
					<NavButton showButton={props.isMenuOpen} openModal={props.openModal}>
						Show Menu
					</NavButton>
				</div>
			</NavigationContainer>
		</header>
	);
};

export default React.memo(Navigation);
