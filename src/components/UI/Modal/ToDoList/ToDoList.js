import React from 'react';
import styled from 'styled-components';
import GreenButton from '../ModalButtons/GreenButton';
import { ReactComponent as TrashIcon } from '../../../../assets/icons/trash.svg';

const AddNewTaskForm = styled.form`
	width: 100%;
	display: flex;
`;
const FormInput = styled.input`
	border: none;
	font-family: 'Roboto', sans-serif;
	padding: 0.6rem 2rem;
	border: 1px solid #4b6584;
	flex: 1;
`;

const TaskList = styled.ul`
	margin: 0;
	padding: 0;
	list-style-type: none;
	margin-bottom: 1rem;
`;
const TaskItem = styled.li`
	width: 100%;
	display: flex;
	align-items: center;
	border-radius: 6px;
	padding: 0.6rem 0.5rem;
	margin: 1rem 0;
	&:hover {
		background-color: #e2e4e9;
	}
`;

const TaskItemText = styled.p`
	word-break: break-all;
	font-size: 1.4rem;
	margin: 0;
`;
const Checkbox = styled.input.attrs({ type: 'checkbox' })`
	margin-right: 1rem;
	align-self: flex-start;
	&:checked + ${TaskItemText} {
		text-decoration: line-through;
	}
`;
const DeleteIconHolder = styled.span`
	display: inline-block;
	margin-left: auto;
	align-self: flex-start;
	& svg {
		width: 1.4rem;
		height: 1.4rem;
	}
`;

const ToDoList = ({
	handleToDoDelete,
	handleToDoAdd,
	todolist,
	handleCheckToDo,
}) => {
	return (
		<div>
			<TaskList>
				{todolist.map((todo) => (
					<TaskItem key={todo.id}>
						<Checkbox
							onChange={() => handleCheckToDo(todo.id)}
							checked={todo.checked}
						/>
						<TaskItemText>{todo.content}</TaskItemText>
						<DeleteIconHolder onClick={() => handleToDoDelete(todo.id)}>
							<TrashIcon />
						</DeleteIconHolder>
					</TaskItem>
				))}
			</TaskList>
			<AddNewTaskForm onSubmit={handleToDoAdd}>
				<FormInput placeholder="Add an element" />
				<GreenButton text="Add" type="submit" />
			</AddNewTaskForm>
		</div>
	);
};

export default ToDoList;
