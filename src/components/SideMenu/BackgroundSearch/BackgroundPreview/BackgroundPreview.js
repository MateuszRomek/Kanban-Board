import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	width: 14rem;
	height: 9.5rem;
	border-radius: 5px;
	background-color: black;
	overflow: hidden;
	cursor: pointer;
	& img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	@media (min-width: 320px) and (max-width: 480px) {
		width: 100%;
	}
`;

const BackgroundPreview = ({ imgUrl, alt, click }) => {
	return (
		<Container onClick={click}>
			<img src={imgUrl} alt={alt} />
		</Container>
	);
};

export default BackgroundPreview;
