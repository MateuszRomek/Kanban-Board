import React from 'react';
import styled from 'styled-components';

const SubmitButton = styled.button`
	padding: 0.5rem 1rem;
	font-size: 1.4rem;
	margin-left: 2rem;
	background-color: #61bd4f;
	border: none;
	color: white;
	font-weight: bold;
`;

const GreenButton = ({ onClick = null, text, type = 'button' }) => {
	return (
		<SubmitButton type={type} onClick={onClick}>
			{text}
		</SubmitButton>
	);
};

export default GreenButton;
