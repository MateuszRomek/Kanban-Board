import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from './Column/Column';
import useCount from '../../customHooks/useRenderCount';
const Container = styled.div`
	display: flex;
`;
const BoardsContainer = ({ currentBoard }) => {
	useCount();
	return (
		<DragDropContext>
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
					</Container>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default React.memo(BoardsContainer);
