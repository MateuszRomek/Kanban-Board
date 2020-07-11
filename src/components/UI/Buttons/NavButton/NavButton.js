import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	background-color: hsla(0, 0%, 100%, 0.1);
	color: white;
	font-size: 1.4rem;
	border: none;
	font-weight: bold;
	padding: 0.5rem 0.5rem;
	transition: opacity 0.2s ease;
	opacity: ${(props) => (props.showButton ? '0' : '1')};
	margin: ${(props) => (props.isMargin ? '0 1rem' : null)};
`;

const NavButton = ({ children, isMargin, openModal, showButton }) => {
	return (
		<Button showButton={showButton} isMargin={isMargin} onClick={openModal}>
			{children}
		</Button>
	);
};

export default NavButton;
