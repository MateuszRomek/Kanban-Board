import React from 'react';
import Card from '../Card/Card';
import { Link, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

const LinkWrapper = styled.div`
	& a {
		text-decoration: none;
		color: black;
	}
`;
const InnerList = ({ cards }) => {
	let { url } = useRouteMatch();
	return cards.map((card, index) => (
		<LinkWrapper key={card.id}>
			<Link to={`${url}/t/${card.id}`}>
				<Card index={index} taskId={card.id} title={card.title} />
			</Link>{' '}
		</LinkWrapper>
	));
};

export default InnerList;
