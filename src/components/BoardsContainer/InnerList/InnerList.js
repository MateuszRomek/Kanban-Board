import React from 'react';
import Task from '../Task/Task';

const InnerList = ({ tasks }) => {
	return tasks.map((task, index) => (
		<Task index={index} key={task.id} taskId={task.id} title={task.title} />
	));
};

export default InnerList;
