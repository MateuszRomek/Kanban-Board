import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import { ReactComponent as LabelIcon } from '../../../../assets/icons/label.svg';
import { ReactComponent as TrashIcon } from '../../../../assets/icons/trash.svg';
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

	& svg {
		height: 1.4rem;
		width: 1.4rem;
		margin-right: 1.6rem;
	}
`;

function SideMenuModal({
	handleSideMenuclick,
	cardId,
	boardId,
	removeCard,
	taskColumn,
	handleModalChange,
}) {
	const handleDeletCard = () => {
		handleModalChange();
		removeCard(boardId, cardId, taskColumn);
	};
	return (
		<ColumnContainer>
			<ColumnTitle>Add to card</ColumnTitle>
			<SideMenuButton className="button-link">
				<LabelIcon />
				Label
			</SideMenuButton>
			<ColumnTitle>Actions</ColumnTitle>
			<SideMenuButton onClick={handleDeletCard}>
				<TrashIcon /> Delete
			</SideMenuButton>
		</ColumnContainer>
	);
}
const mapDispatchToProps = (dispatch) => {
	return {
		removeCard: (boardId, cardId, columnId) =>
			dispatch(actions.removeCard(boardId, cardId, columnId)),
	};
};
export default connect(null, mapDispatchToProps)(SideMenuModal);
