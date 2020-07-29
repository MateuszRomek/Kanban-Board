import React from 'react';
import Card from '../Card/Card';
import { Link, useRouteMatch } from 'react-router-dom';

const InnerList = ({ cards }) => {
	let { url } = useRouteMatch();
	return cards.map((card, index) => (
		<Link key={card.id} to={`${url}/t/${card.id}`}>
			<Card index={index} taskId={card.id} title={card.title} />
		</Link>
	));
};

export default InnerList;
