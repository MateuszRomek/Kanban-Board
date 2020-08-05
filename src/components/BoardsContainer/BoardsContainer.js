import React, { useContext } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Modal from '../UI/Modal/Modal';
import { ModalContext } from '../../context/ModalContext';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../store/actions';
import Column from './Column/Column';
import AddNewColumn from './AddNewColumn/AddNewColumn';
import useCount from '../../customHooks/useRenderCount';
const Container = styled.div`
	display: flex;
	overflow: auto;
	overflow-y: hidden;
	@media (min-width: 320px) and (max-width: 480px) {
		overflow-x: scroll;
		padding: 0 1rem;
	}
`;

const BoardsContainer = ({ currentBoard, onDragEnd, boardId }) => {
	const handleDragEnd = (result) => {
		onDragEnd(result, boardId);
	};
	const modalContext = useContext(ModalContext);
	console.log(currentBoard.columnOrder);
	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			{modalContext.isModalOpen && (
				<Modal labels={currentBoard.labels} boardId={boardId} />
			)}
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
									currentBoard={currentBoard}
									index={index}
									column={column}
									key={columnId}
									cards={cards}
								/>
							);
						})}
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
