import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import InnerList from '../InnerList/InnerList';
import AddNewTask from '../AddNewTask/AddNewTask';
import { CSSTransition } from 'react-transition-group';
import Form from '../AddNewTask/AddNewTaskForm/AddNewTaskForm';
const Container = styled.div`
	padding: 2px 5px;
	margin: 10px 15px;
	border: 1px solid white;
	border-radius: 4px;
	min-width: 30rem;

	max-height: 75rem;
	overflow-y: auto;
	overflow-x: hidden;
	display: flex;
	flex-direction: column;
	background-color: #ebecf0;
`;

const ColumnTitle = styled.h2`
	padding: 8px;
`;

const TaskList = styled.div`
	padding: 8px;
	flex-grow: 1;
	min-height: 11rem;
	background-color: ${(props) =>
		props.isDraggingOver ? 'lightgrey' : 'inherit'};
`;
const RelativeDiv = styled.div`
	position: relative;
	overflow: hidden;
	height: 3.7rem;
	width: 100%;
	border-radius: 4px;
`;

const AddNewContainer = styled.div`
	position: absolute;
	width: 100%;
`;

const Column = (props) => {
	const [isClicked, setClicked] = useState(false);
	const btnRef = React.useRef(null);
	const formRef = React.useRef(null);
	return (
		<Draggable draggableId={props.column.id} index={props.index}>
			{(provided) => (
				<Container {...provided.draggableProps} ref={provided.innerRef}>
					<ColumnTitle {...provided.dragHandleProps}>
						{props.column.title}
					</ColumnTitle>
					<Droppable type="task" droppableId={props.column.id}>
						{(provided, snapshot) => (
							<TaskList
								ref={provided.innerRef}
								isDraggingOver={snapshot.isDraggingOver}
								{...provided.droppableProps}
							>
								<InnerList tasks={props.tasks} />
								{provided.placeholder}
								<RelativeDiv>
									<CSSTransition
										nodeRef={btnRef}
										classNames="addCard-primary"
										in={!isClicked}
										unmountOnExit
										timeout={500}
									>
										<AddNewContainer ref={btnRef} className="addCard">
											<AddNewTask onClick={() => setClicked(true)} />
										</AddNewContainer>
									</CSSTransition>
									<CSSTransition
										nodeRef={formRef}
										classNames="addCardSecondary-primary"
										in={isClicked}
										unmountOnExit
										timeout={500}
									>
										<AddNewContainer ref={formRef} className="addCardSecondary">
											<Form onClick={() => setClicked(false)} />
										</AddNewContainer>
									</CSSTransition>
								</RelativeDiv>
							</TaskList>
						)}
					</Droppable>
					{provided.placeholder}
				</Container>
			)}
		</Draggable>
	);
};

export default Column;
