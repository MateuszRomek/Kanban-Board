import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
0%{
  -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
}

100% {
  -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
}
`;

const Loader = styled.div`
	font-size: 5px;
	margin: 50px auto;
	text-indent: -9999em;
	width: 11em;
	height: 11em;
	border-radius: 50%;
	background: white;
	background: -moz-linear-gradient(left, #000000 10%, rgba(0, 0, 0, 0) 42%);
	background: -webkit-linear-gradient(left, #000000 10%, rgba(0, 0, 0, 0) 42%);
	background: -o-linear-gradient(left, #000000 10%, rgba(0, 0, 0, 0) 42%);
	background: -ms-linear-gradient(left, #000000 10%, rgba(0, 0, 0, 0) 42%);
	background: linear-gradient(to right, #000000 10%, rgba(0, 0, 0, 0) 42%);
	position: relative;
	-webkit-animation: ${rotate} 1.4s infinite linear;
	animation: ${rotate} 1.4s infinite linear;
	-webkit-transform: translateZ(0);
	-ms-transform: translateZ(0);
	transform: translateZ(0);
	&::after {
		background: white;
		width: 75%;
		height: 75%;
		border-radius: 50%;
		content: '';
		margin: auto;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
	&::before {
		width: 50%;
		height: 50%;
		background: #000000;
		border-radius: 100% 0 0 0;
		position: absolute;
		top: 0;
		left: 0;
		content: '';
	}
`;

const SpinnerContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	grid-column: ${(props) => (props.isOnGrid ? '1/-1' : null)};
`;
const Spinner = ({ isOnGrid }) => {
	return (
		<SpinnerContainer isOnGrid={isOnGrid}>
			<Loader />
		</SpinnerContainer>
	);
};

export default Spinner;
