import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import actions from '../../containers/BoardCreator/duck/actions';

import Column from './Column/Column';

const Container = styled.div`
	display: flex;
`;

const AddColumnHolder = styled.div`
	padding: 2px 5px;
	margin: 10px 15px;
	border: 1px solid white;
	border-radius: 4px;
	min-width: 30rem;

	background-color: #ebecf0;
`;
const BoardsContainer = ({ currentBoard, onDragEnd, location }) => {
	const handleDragEnd = (result) => {
		const boardId = location.search.split('=')[1];
		onDragEnd(result, boardId);
	};
	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable droppableId="all-columns" direction="horizontal" type="column">
				{(provided) => (
					<Container {...provided.droppableProps} ref={provided.innerRef}>
						{currentBoard.columnOrder.map((columnId, index) => {
							const column = currentBoard.columns[columnId];

							const cards = column.cardsIds.map(
								(cardId) => currentBoard.cards[cardId]
							);

							return (
								<Column
									index={index}
									column={column}
									key={columnId}
									cards={cards}
								/>
							);
						})}
						{provided.placeholder}
						<AddColumnHolder>Test</AddColumnHolder>
					</Container>
				)}
			</Droppable>
		</DragDropContext>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		onDragEnd: (result, boardId) =>
			dispatch(actions.onDragEnd(result, boardId)),
	};
};

export default compose(
	connect(null, mapDispatchToProps),
	React.memo,
	withRouter
)(BoardsContainer);
