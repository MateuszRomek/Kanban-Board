import React from 'react';
import styled from 'styled-components';

const AddButton = styled.span`
	margin-top: auto;
	width: 100%;
	display: inline-block;
	background-color: white;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23);
	font-size: 1.3rem;
	border: 1px solid white;
	color: rgb(174, 177, 191);
	padding: 1rem 1.3rem;
	border-radius: 4px;
`;

const AddNewTask = (props) => {
	return <AddButton onClick={props.onClick}>Add New Card</AddButton>;
};

export default AddNewTask;
