import React, { useContext } from 'react';
import Card from '../Card/Card';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { ModalContext } from '../../../context/ModalContext';
const LinkWrapper = styled.div`
	& a {
		text-decoration: none;
		color: black;
	}
`;
const InnerList = ({ cards, columnId }) => {
	let { url } = useRouteMatch();
	const { handleModalChange, handleTaskChoose, handleTaskColumn } = useContext(
		ModalContext
	);
	const handleCardClick = (card) => {
		handleTaskColumn(columnId);
		handleTaskChoose(card);
		handleModalChange();
	};
	return cards.map((card, index) => (
		<LinkWrapper onClick={() => handleCardClick(card)} key={card.id}>
			<Link to={`${url}/t/${card.id}`}>
				<Card index={index} taskId={card.id} title={card.title} />
			</Link>
		</LinkWrapper>
	));
};

export default InnerList;
