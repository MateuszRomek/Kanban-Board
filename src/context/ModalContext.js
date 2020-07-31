import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
	const [isModalOpen, setModal] = useState(false);
	const [openedTask, setTask] = useState(null);
	const handleModalChange = () => setModal(!isModalOpen);
	const handleTaskChoose = (task) => setTask(task);
	console.log(openedTask);
	return (
		<ModalContext.Provider
			value={{ isModalOpen, handleModalChange, handleTaskChoose, openedTask }}
		>
			{children}
		</ModalContext.Provider>
	);
};

export default ModalContextProvider;
