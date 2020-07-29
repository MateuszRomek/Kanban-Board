import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../../store/actions';
import useBoardIdFromUrl from '../../../customHooks/useBoardIdFromUrl';
import InnerList from '../InnerList/InnerList';
import AddNewCard from '../AddNewCard/AddNewCard';
import Form from '../AddNewCard/AddNewCardForm/AddNewCardForm';
const Container = styled.div`
	align-self: flex-start;
	padding: 3px 6px;
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

const ColumnTitleHolder = styled.div`
	padding: 1rem;
`;

const TaskList = styled.div`
	padding: 8px;
	flex-grow: 1;
	min-height: 9rem;
	background-color: ${(props) =>
		props.isDraggingOver ? 'lightgrey' : 'inherit'};
`;
const RelativeDiv = styled.div`
	align-self: flex-end;
	position: relative;
	overflow: hidden;
	height: 3.7rem;
	width: 100%;
	border-radius: 4px;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23);
`;

const AddNewContainer = styled.div`
	position: absolute;
	width: 100%;
`;

const TextArea = styled.textarea`
	width: 95%;
	padding: 0.5rem;
	border: none;
	background-color: transparent;
	resize: none;
	font-size: 2rem;
	height: 3rem;
	word-break: break-all;
	overflow: hidden;
`;

const Column = (props) => {
	const [isClicked, setClicked] = useState(false);
	const btnRef = React.useRef(null);
	const formRef = React.useRef(null);
	const currentBoardId = useBoardIdFromUrl(props.location);
	const currentBoardColumns = props.boardState[currentBoardId].columns;
	const currentColumnTitle = currentBoardColumns[props.column.id].title;

	const handleColumnTitleChange = (e) => {
		const newTitle = e.target.value;
		props.textareaChange(newTitle, currentBoardId, props.column.id);
	};
	return (
		<Draggable draggableId={props.column.id} index={props.index}>
			{(provided) => (
				<Container
					data-colid={props.column.id}
					data-column={'column'}
					{...provided.draggableProps}
					ref={provided.innerRef}
				>
					<ColumnTitleHolder {...provided.dragHandleProps}>
						<TextArea
							value={currentColumnTitle}
							onChange={handleColumnTitleChange}
						/>
					</ColumnTitleHolder>
					<Droppable type="task" droppableId={props.column.id}>
						{(provided, snapshot) => (
							<TaskList
								ref={provided.innerRef}
								isDraggingOver={snapshot.isDraggingOver}
								{...provided.droppableProps}
							>
								<InnerList cards={props.cards} />
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
											<AddNewCard onClick={() => setClicked(true)} />
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
											<Form closeForm={() => setClicked(false)} />
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

const mapStateToProps = (state) => {
	return {
		boardState: state.BoardsReducer,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		textareaChange: (newColumnTitle, boardId, columnId) =>
			dispatch(actions.changeColumnTitle(newColumnTitle, boardId, columnId)),
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withRouter
)(Column);
