import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
	const [isModalOpen, setModal] = useState(false);
	const [openedTask, setTask] = useState(null);
	const [taskColumn, setTaskColumn] = useState(null);
	const handleModalChange = () => setModal(!isModalOpen);
	const handleTaskChoose = (task) => setTask(task);
	const handleTaskColumn = (columnId) => setTaskColumn(columnId);
	return (
		<ModalContext.Provider
			value={{
				isModalOpen,
				handleModalChange,
				handleTaskChoose,
				openedTask,
				taskColumn,
				handleTaskColumn,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};

export default ModalContextProvider;
