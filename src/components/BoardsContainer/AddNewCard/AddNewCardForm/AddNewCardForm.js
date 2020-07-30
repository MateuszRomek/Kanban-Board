import { ReactComponent as ArrowLeftIcon } from '../../../../assets/icons/arrowBackLeft.svg';

import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../../../../store/actions';

import { withRouter } from 'react-router-dom';

import AddButton from '../../../UI/Buttons/AddButton/AddButton';
import useBoardIdFromUrl from '../../../../customHooks/useBoardIdFromUrl';
const Form = styled.form`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 1rem 1.3rem;
	background-color: white;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23);
	font-size: 1.5rem;
	padding-left: 2rem;
	position: relative;
	max-height: 3.7rem;
`;
const FormInput = styled.input`
	border: none;
	background-color: transparent;
	position: relative;
	padding: 0.55rem 0.6rem;
	display: inline-block;

	&::after {
		content: '';
		width: 100%;
		height: 2px;
		background-color: gray;
		position: absolute;
		left: 0;
		bottom: 0;
	}
`;

const ArrowHolder = styled.span`
	position: absolute;
	left: 0.8rem;
	top: calc(50% - 8px);
	height: 1.6rem;
	width: 1.6rem;
	& svg {
		width: 100%;
		height: 100%;
	}
`;

const AddNewCardForm = (props) => {
	const boardId = useBoardIdFromUrl(props.location);

	const handleAddNewTask = (e) => {
		e.preventDefault();
		const parentColumn = e.target.closest('div[data-column="column"]');
		const columnId = parentColumn.dataset.colid;

		const cardTitle = e.target.elements[0].value;
		props.addNewCard(cardTitle, boardId, columnId);
		e.target.elements[0].value = '';
		props.closeForm();
	};
	return (
		<Form onSubmit={handleAddNewTask}>
			<ArrowHolder onClick={props.closeForm}>
				<ArrowLeftIcon />
			</ArrowHolder>
			<FormInput placeholder="Type here.." />
			<AddButton isSubmitType={true} />
		</Form>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		addNewCard: (cardTitle, boardId, columnId) =>
			dispatch(actions.addNewCard(cardTitle, boardId, columnId)),
	};
};

export default compose(
	withRouter,
	connect(null, mapDispatchToProps)
)(AddNewCardForm);
