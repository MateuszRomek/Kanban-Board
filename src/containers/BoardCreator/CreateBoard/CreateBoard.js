import React from 'react';
import styled from 'styled-components';
import { ReactComponent as PlusIcon } from '../../../assets/icons/plus.svg';
import { connect } from 'react-redux';
import actions from '../duck/actions';

const AddNewBoard = styled.div`
	width: 18rem;
	height: 11rem;
	background-color: rgba(255, 255, 255, 0.7);
	display: flex;
	align-items: center;
	border-radius: 3px;
	justify-content: center;
	transition: transform 0.3s ease-in-out;
	box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
	transform: scale(0.9);
	margin: 0.5rem;
	@media (min-width: 320px) and (max-width: 480px) {
		width: 16rem;
		height: 9rem;
	}
	&:hover {
		transform: scale(1);
	}
`;

const CreateButton = styled.button`
	background-color: transparent;
	border: none;
	display: flex;
	align-items: center;
	font-size: 1.5rem;
	font-weight: bold;

	& svg {
		width: 18px;
		height: 18px;
		margin-right: 0.6rem;
		@media (min-width: 320px) and (max-width: 480px) {
			display: none;
		}
	}
	&:active {
		outline: none;
	}
	&:focus {
		outline: none;
	}
`;

const CreateForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const CreateInput = styled.input`
	padding: 0.5rem 0.3rem;
	width: 80%;
	display: block;
	background-color: transparent;
	border: none;
	border-bottom: 1px solid gray;
	margin-bottom: 0.8rem;
	font-size: 1.7rem;
	&:active {
		outline: none;
	}
	&:focus {
		outline: none;
	}

	@media (min-width: 320px) and (max-width: 480px) {
		border: 1px solid gray;
		padding: 0.5rem 0.6rem;
	}
`;

const CreateBoard = ({ addNewBoard }) => {
	const onFormSubmit = (e) => {
		e.preventDefault();
		const inputValue = e.target.elements[0].value.trim();
		if (inputValue === '') return;
		addNewBoard(inputValue);
		e.target.elements[0].value = '';
	};
	return (
		<AddNewBoard>
			<CreateForm onSubmit={onFormSubmit}>
				<CreateInput autoComplete="off" placeholder="To Do" name="boardName" />
				<CreateButton type="submit">
					<PlusIcon /> Create Board
				</CreateButton>
			</CreateForm>
		</AddNewBoard>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		addNewBoard: (userBoardName) =>
			dispatch(actions.createNewBoard(userBoardName)),
	};
};
export default connect(null, mapDispatchToProps)(CreateBoard);
