import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const CardItem = styled.div`
	border: 1px solid white;
	margin-bottom: 8px;
	border-radius: 4px;
	padding: 0.4rem 1.3rem 1rem;
	background-color: white;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23);
	&:hover {
		cursor: pointer;
	}
`;

const FlexLabelContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	padding: 0.8rem 0 0;
	max-width: 24rem;
`;

const Label = styled.div`
	background-color: ${({ bgColor }) => (bgColor ? bgColor : 'transparent')};
	width: 30px;
	padding: 0.3rem;
	border-radius: 20px;
	margin: 0 1rem 1rem 0;
`;

const Card = (props) => {
	const labelArr =
		props.cardLabels.length > 0 &&
		props.cardLabels
			.map((labelId) => props.allLabels[labelId])
			.map((label) => <Label key={label.id} bgColor={label.bgColor} />);
	return (
		<Draggable index={props.index} draggableId={props.taskId}>
			{(provided, snapshot) => (
				<CardItem
					isDragging={snapshot.isDragging}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<FlexLabelContainer>{labelArr}</FlexLabelContainer>
					{props.title}
				</CardItem>
			)}
		</Draggable>
	);
};

export default Card;
