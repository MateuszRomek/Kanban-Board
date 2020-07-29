import React from 'react';
import styled from 'styled-components';

import { ReactComponent as LabelIcon } from '../../../../assets/icons/label.svg';
const ColumnContainer = styled.aside`
	display: flex;
	flex-direction: column;
	padding: 6.9rem 0rem 1rem 1rem;
`;
const ColumnTitle = styled.h3`
	font-size: 1.6rem;
	font-weight: 400;
	margin-bottom: 0;
	@media (min-width: 320px) and (max-width: 480px) {
		font-size: 1.4rem;
	}
`;
const SideMenuButton = styled.button`
	border: none;
	padding: 0.8rem 1rem;
	font-size: 14px;
	font-weight: 400;
	background-color: #e2e4e9;
	margin: 0.5rem 0;
	color: #4c5b76;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
`;

const SideMenuHolder = styled.div``;

function SideMenuModal({ handleSideMenuclick }) {
	return (
		<ColumnContainer>
			<ColumnTitle>Add to card</ColumnTitle>
			<SideMenuHolder>
				<SideMenuButton className="button-link">
					<LabelIcon
						style={{ height: '14px', width: '14px', marginRight: '16px' }}
					/>
					Label
				</SideMenuButton>
			</SideMenuHolder>
		</ColumnContainer>
	);
}

export default SideMenuModal;
