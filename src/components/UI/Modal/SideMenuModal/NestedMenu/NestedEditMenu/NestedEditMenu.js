import React, { useRef } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as CloseIcon } from '../../../../../../assets/icons/close.svg';
import SubmitButton from '../../../ModalButtons/GreenButton';

const EditMenu = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: white;
	transition: opacity 250ms, transform 250ms;
`;

const EditMenuParagraph = styled.p`
	color: inherit;
	font-size: 16px;
	font-weight: bold;
`;

const EditMenuLabel = styled.label`
	display: block;
	font-size: 14px;
	font-weight: 400;
	margin-bottom: 4px;
`;
const EditMenuInputText = styled.input`
	display: block;
	padding: 0.4rem 0.6rem;
`;
const CloseButton = styled.button`
	border: none;
	padding: 0.6rem 0.9rem;
	font-size: bold;
	border-radius: 10px;
	color: inherit;
	background-color: transparent;
	transition: background-color 0.3s, color 0.3s;
	display: grid;
	place-items: center;
	&:hover {
		background-color: #4c5b76;
		color: white;
	}
	& svg {
		height: 16px;
		width: 16px;
	}
`;

const EditMenuHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const EditMenuForm = styled.form`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const NestedEditMenu = ({ isEdit, handleEditMenu, handleEditChange }) => {
	const EditMenuRef = useRef(null);
	return (
		<>
			<CSSTransition
				in={isEdit === true}
				timeout={250}
				classNames="editMenu-primary"
				unmountOnExit
				nodeRef={EditMenuRef}
			>
				<EditMenu ref={EditMenuRef} className="editMenu">
					<EditMenuHeader>
						<EditMenuParagraph>Change label</EditMenuParagraph>
						<CloseButton onClick={handleEditMenu}>
							<CloseIcon />
						</CloseButton>
					</EditMenuHeader>
					<EditMenuForm onSubmit={(e) => handleEditChange(e)}>
						<div>
							<EditMenuLabel htmlFor="newLabelname"> Name </EditMenuLabel>
							<EditMenuInputText
								autoComplete="off"
								id="newLabelName"
								type="text"
							></EditMenuInputText>
						</div>
						<SubmitButton
							extraStyle={{ alignSelf: 'flex-end' }}
							text="Save"
							type="submit"
						/>
					</EditMenuForm>
				</EditMenu>
			</CSSTransition>
		</>
	);
};

export default NestedEditMenu;
