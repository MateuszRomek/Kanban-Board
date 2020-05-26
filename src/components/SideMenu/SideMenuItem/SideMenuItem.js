import React from 'react';
import styled from 'styled-components';

const MenuItem = styled.a`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin: 1.1rem 0;
	font-size: 1.4rem;
	& > svg {
		width: 1.5rem;
		height: 1.5rem;
		margin-right: 1rem;
	}
	&:hover {
		cursor: pointer;
	}
`;

const SideMenuItem = ({ children, iconComponent, openMenu }) => {
	return (
		<MenuItem onClick={openMenu}>
			{iconComponent}
			{children}
		</MenuItem>
	);
};

export default SideMenuItem;
