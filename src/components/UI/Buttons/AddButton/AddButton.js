import React from 'react';
import { ReactComponent as PlusIcon } from '../../../../assets/icons/plus.svg';
import styled from 'styled-components';

const FormSubmitButton = styled.button`
	border: none;
	background-color: transparent;
	height: 2.6rem;
	width: 2.6rem;
	padding: 0.6rem;
	display: inline-block;
	& svg {
		width: 100%;
		height: 100%;
	}
`;

const AddButton = ({ isSubmitType }) => {
	const btnType = isSubmitType ? 'submit' : null;
	return (
		<FormSubmitButton type={btnType}>
			<PlusIcon />
		</FormSubmitButton>
	);
};

export default AddButton;
