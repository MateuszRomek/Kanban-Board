import React from 'react';
import Card from '../Card/Card';

const InnerList = ({ tasks }) => {
	return tasks.map((card, index) => (
		<Card index={index} key={card.id} taskId={card.id} title={card.title} />
	));
};

export default InnerList;
