import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Column from './Column/Column';

const Container = styled.div`
	display: flex;
`;
const BoardsContainer = ({ currentBoard }) => {
	return (
		<DragDropContext>
			<Droppable droppableId="all-columns" direction="horizontal" type="column">
				{(provided) => (
					<Container {...provided.droppableProps} ref={provided.innerRef}>
						{currentBoard.columnOrder.map((columnId, index) => {
							const column = currentBoard.columns[columnId];

							const tasks = column.tasksIds.map(
								(taskId) => currentBoard.tasks[taskId]
							);
							return (
								<Column
									index={index}
									column={column}
									key={columnId}
									tasks={tasks}
								/>
							);
						})}
					</Container>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default BoardsContainer;
