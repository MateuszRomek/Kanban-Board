import React from 'react';
import styled from 'styled-components';
import AddButton from '../../UI/Buttons/AddButton/AddButton';
import useBoardIdFromUrl from '../../../customHooks/useBoardIdFromUrl';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
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
	position: relative;
	@media (min-width: 320px) and (max-width: 480px) {
		&::after {
			content: '';
			position: absolute;
			top: 0;
			right: -1rem;
			width: 1rem;
			height: 0.1rem;
		}
	}
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
	const boardId = useBoardIdFromUrl(location);

	const handleFormSubmit = (e) => {
		e.preventDefault();
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
