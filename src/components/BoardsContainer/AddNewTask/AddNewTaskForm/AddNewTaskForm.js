import { ReactComponent as ArrowLeftIcon } from '../../../../assets/icons/arrowBackLeft.svg';
import { ReactComponent as PlusIcon } from '../../../../assets/icons/plus.svg';

import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 1rem 1.3rem;
	background-color: white;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23);
	font-size: 1.5rem;
	padding-left: 2rem;
	position: relative;
	max-height: 3.7rem;
`;
const FormInput = styled.input`
	border: none;
	background-color: transparent;
	position: relative;
	padding: 0.55rem 0.6rem;
	display: inline-block;

	&::after {
		content: '';
		width: 100%;
		height: 2px;
		background-color: gray;
		position: absolute;
		left: 0;
		bottom: 0;
	}
`;
const FormSubmitButton = styled.button`
	border: none;
	background-color: transparent;
	height: 2.4rem;
	width: 2.4rem;
	padding: 0.6rem;
	display: inline-block;
	& svg {
		width: 100%;
		height: 100%;
	}
`;

const ArrowHolder = styled.span`
	position: absolute;
	left: 0.8rem;
	top: calc(50% - 8px);
	height: 1.6rem;
	width: 1.6rem;
	& svg {
		width: 100%;
		height: 100%;
	}
`;

const AddNewTaskForm = (props) => {
	return (
		<Form>
			<ArrowHolder onClick={props.onClick}>
				<ArrowLeftIcon />
			</ArrowHolder>
			<FormInput placeholder="Type here.." />
			<FormSubmitButton>
				<PlusIcon />
			</FormSubmitButton>
		</Form>
	);
};

export default AddNewTaskForm;
