import React from 'react';
import styled from 'styled-components';
import AddButton from '../../UI/Buttons/AddButton/AddButton';

import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { findBoardId } from '../../../utils/findBoardId';
const AddColumnHolder = styled.div`
	padding: 2px 5px;
	margin: 10px 15px;
	border: 1px solid white;
	border-radius: 4px;
	min-width: 30rem;
	max-height: 7rem;
	background-color: #ebecf0;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const FormHolder = styled.form`
	display: flex;
	justify-content: space-around;
	width: 100%;
	position: relative;
	&::after {
		content: '';
		position: absolute;
		left: 0.5rem;
		bottom: 0;
		width: 85%;
		height: 1px;
		background-color: rgba(87, 91, 94, 0.4);
	}
`;

const Input = styled.input`
	flex: 2;
	background-color: transparent;
	border: none;
	padding: 0 0.5rem;
	&:focus {
		outline: none;
	}
`;
const AddInformation = styled.p`
	color: #4b6584;
	margin: 0.6rem 0;
`;

const AddNewColumn = ({ addNewColumn, location }) => {
	const handleFormSubmit = (e) => {
		e.preventDefault();
		const boardId = findBoardId(location);
		const columnTitle = e.currentTarget.elements[0].value;
		addNewColumn(boardId, columnTitle);

		e.currentTarget.reset();
	};

	return (
		<AddColumnHolder>
			<AddInformation>Add new column</AddInformation>
			<FormHolder onSubmit={handleFormSubmit}>
				<Input placeholder="Column Title" />
				<AddButton isSubmitType={true} />
			</FormHolder>
		</AddColumnHolder>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		addNewColumn: (boardId, columnTitle) =>
			dispatch(actions.addNewColumn(boardId, columnTitle)),
	};
};

export default compose(
	withRouter,
	connect(null, mapDispatchToProps)
)(AddNewColumn);
