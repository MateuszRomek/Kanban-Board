import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const TaskItem = styled.div`
	padding: 5px 8px;
	border: 1px solid white;
	margin-bottom: 8px;
	border-radius: 4px;
	padding: 1rem 1.3rem;

	background-color: white;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23);
`;
const Task = (props) => {
	return (
		<Draggable index={props.index} draggableId={props.taskId}>
			{(provided, snapshot) => (
				<TaskItem
					isDragging={snapshot.isDragging}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					{props.title}
				</TaskItem>
			)}
		</Draggable>
	);
};

export default Task;
