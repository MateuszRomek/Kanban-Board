import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions';
import Column from './Column/Column';
import AddNewColumn from './AddNewColumn/AddNewColumn';
import useBoardIdFromUrl from '../../customHooks/useBoardIdFromUrl';
const Container = styled.div`
	display: flex;
	overflow: auto;
	overflow-y: hidden;
	@media (min-width: 320px) and (max-width: 480px) {
		overflow-x: scroll;
	}
`;

const BoardsContainer = ({ currentBoard, onDragEnd, location }) => {
	const boardId = useBoardIdFromUrl(location);
	const handleDragEnd = (result) => {
		onDragEnd(result, boardId);
	};

	const columnArray = currentBoard.columnOrder.map((columnId, index) => {
		const column = currentBoard.columns[columnId];
		const cards = column.cardsIds.map((cardId) => currentBoard.cards[cardId]);
		return (
			<Column index={index} column={column} key={columnId} cards={cards} />
		);
	});

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable droppableId="all-columns" direction="horizontal" type="column">
				{(provided) => (
					<Container {...provided.droppableProps} ref={provided.innerRef}>
						{columnArray}
						{provided.placeholder}
						<AddNewColumn />
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
