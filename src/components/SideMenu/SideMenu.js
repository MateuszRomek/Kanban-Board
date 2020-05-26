import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/searchIcon.svg';
import { ReactComponent as ChangeBackgroundIcon } from '../../assets/icons/backgroundImage.svg';
import { ReactComponent as GoBackIcon } from '../../assets/icons/arrowBackLeft.svg';

import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import SideMenuItem from './SideMenuItem/SideMenuItem';
import BackgroundSearch from './BackgroundSearch/BackgroundSearch';

const SideMenuContainer = styled.div`
	position: absolute;
	top: 5rem;
	bottom: 0;
	right: 0;
	width: 330px;
	background-color: white;
	padding: 1rem 1.5rem 0;
	z-index: 99;
	transition: transform 0.3s ease-in-out;
	color: #4b6584;
	transform: ${(props) =>
		props.isOpen ? 'translateX(0%)' : 'translateX(100%)'};
	overflow: hidden;
	@media (min-width: 320px) and (max-width: 480px) {
		width: 100%;
	}
`;

const CurrentMenuHolder = styled.div`
	position: absolute;
	width: calc(100% - 3rem);
	height: calc(100% - 6.5rem);
`;

const MenuHeaderContainer = styled.div`
	text-align: center;
	padding: 1rem 0;
	position: relative;
`;

const MenuHeader = styled.h2`
	border-bottom: 1px solid #bdc3c7;
	font-size: 1.7rem;
	margin: 0;
`;

const MenuSection = styled.section`
	padding: 1rem 1.2rem;
	border-bottom: 1px solid #bdc3c7;
`;
const MenuCloseButton = styled.button`
	position: absolute;

	border: none;
	background-color: transparent;
	right: 0;
	top: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	& svg {
		height: 15px;
		width: 15px;
	}
`;
const GoBackButton = styled.button`
	position: absolute;
	top: 1rem;
	left: 0.5rem;
	border: none;
	transition: transform 0.5s ease, opacity 0.5s ease;
	transform: ${(props) =>
		props.showButton ? `translateX(0)` : `translateX(-120%)`};
	opacity: ${(props) => (props.showButton ? `1` : `0`)};

	display: flex;
	align-items: center;
	justify-content: center;
	background-color: transparent;
	& svg {
		height: 15px;
		width: 15px;
	}
`;

const SideMenu = (props) => {
	const nodeRef = React.useRef(null);
	const backgroundRef = React.useRef(null);

	const [activeMenu, setActiveMenu] = useState('main');

	const openActiveMenu = (menuName) => setActiveMenu(menuName);

	const handleCloseMainMenu = () => {
		props.closeModal();
		setActiveMenu('main');
	};

	const showGoBackButton = activeMenu !== 'main';
	return (
		<SideMenuContainer isOpen={props.isMenuOpen}>
			<MenuHeaderContainer>
				<MenuHeader> Menu </MenuHeader>

				<GoBackButton
					onClick={() => setActiveMenu('main')}
					showButton={showGoBackButton}
				>
					<GoBackIcon />
				</GoBackButton>

				<MenuCloseButton onClick={handleCloseMainMenu}>
					<CloseIcon />
				</MenuCloseButton>
			</MenuHeaderContainer>

			<CSSTransition
				in={activeMenu === 'main'}
				classNames="menu-primary"
				timeout={500}
				unmountOnExit
				nodeRef={nodeRef}
			>
				<CurrentMenuHolder ref={nodeRef} className="menu">
					<MenuSection>
						<SideMenuItem iconComponent={<SearchIcon />}>
							About this board
						</SideMenuItem>

						<SideMenuItem
							openMenu={() => openActiveMenu('background')}
							iconComponent={<ChangeBackgroundIcon />}
						>
							Change Background
						</SideMenuItem>
					</MenuSection>
				</CurrentMenuHolder>
			</CSSTransition>

			<CSSTransition
				in={activeMenu === 'background'}
				classNames="menu-secondary"
				timeout={500}
				unmountOnExit
				nodeRef={backgroundRef}
			>
				<CurrentMenuHolder ref={backgroundRef}>
					<BackgroundSearch />
				</CurrentMenuHolder>
			</CSSTransition>
		</SideMenuContainer>
	);
};

export default SideMenu;
