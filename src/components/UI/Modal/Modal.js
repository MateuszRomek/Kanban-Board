import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as DescriptionIcon } from '../../../assets/icons/description.svg';
import { ReactComponent as ToDoListIcon } from '../../../assets/icons/todolist.svg';
import { useEffect } from 'react';
import SideMenuModal from './SideMenuModal/SideMenuModal';
import NestedMenu from './SideMenuModal/NestedMenu/NestedMenu';

const Backdrop = styled.div`
	position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	background-color: rgba(55, 56, 59, 0.6);
	z-index: 10;
`;

const ModalOuter = styled.div`
	padding: 1rem 3rem;
	background-color: #f4f5f7;
	height: 60rem;
	width: 65rem;
	@media (max-width: 700px) {
		width: 100% !important;
	}
`;

const ModalInner = styled.div`
	padding: 1rem 0;
	height: 100%;
	color: #4b6584;
	display: grid;
	grid-template-columns: 75% 25%;
`;
const CardDetailsContainer = styled.div``;
const ModalTitle = styled.h2`
	color: inherit;
`;
const AlignInOneLine = styled.div`
	display: flex;
	align-items: center;
`;

const FieldName = styled.p`
	color: inherit;
	margin-left: 1rem;
`;
const Textarea = styled.textarea`
	width: 100%;
	min-height: ${(props) => (props.isActivity ? '1rem' : '10.8rem')};
	border: none;
	font-family: 'Roboto', sans-serif;
	padding: 1rem 2rem;
	resize: none;
	border: ${({ isBorder }) => (isBorder ? '1px solid #4b6584' : 'none')};
	&::placeholder {
		color: #4b6584;
	}
	&:focus {
		outline: none;
	}
	&:active {
		outline: none;
	}
`;

const ModalForm = styled.form`
	height: ${({ isActivityClicked }) => (isActivityClicked ? '9rem' : '5rem')};
	transition: height 0.4s;
	position: relative;
	overflow: hidden;
	background-color: white;
	border: 1px solid #4b6584;
`;
const SubmitButton = styled.button`
	padding: 0.5rem 1rem;
	font-size: 1.4rem;
	margin-left: 2rem;
	background-color: #61bd4f;
	border: none;
	color: white;
	font-weight: bold;
`;
function Modal() {
	const [isActivityClicked, setActivity] = useState(false);
	const [isMenuClicked, setMenuData] = useState({
		isOpen: false,
		x: 0,
		y: 0,
		height: 0,
	});

	const handleSideMenuclick = (e) => {
		if (!e.target.classList.contains('button-link')) {
			console.log('to nie jest button link');

			setMenuData({
				...isMenuClicked,
				isOpen: false,
			});
		} else {
			const { x, y, height } = e.target.getBoundingClientRect();
			setMenuData({
				isOpen: !isMenuClicked.isOpen,
				x,
				y,
				height,
			});
		}
	};

	const handleActivityChange = () => {
		setActivity(!isActivityClicked);
	};
	useEffect(() => {
		const innerModal = document.querySelector('.innerModal');
		innerModal.addEventListener('click', (e) => {
			if (!e.target.classList.contains('activity')) {
				if (isActivityClicked === false) return;
				setActivity(false);
			}
		});
		return () => {
			innerModal.removeEventListener('click', (e) => {
				if (!e.target.classList.contains('activity')) {
					if (isActivityClicked === false) return;
					setActivity(false);
				}
			});
		};
	}, [isActivityClicked]);
	return (
		<Backdrop>
			<NestedMenu isSideMenuClicked={isMenuClicked} buttonType="label" />
			<ModalOuter>
				<ModalInner onClick={handleSideMenuclick} className="innerModal">
					<CardDetailsContainer>
						<ModalTitle>YOUR TASK NAME</ModalTitle>
						<>
							<AlignInOneLine>
								<DescriptionIcon style={{ height: '17px', width: '17px' }} />
								<FieldName>Description</FieldName>
							</AlignInOneLine>
							<Textarea
								placeholder="Add a more detailed description"
								isBorder={true}
							/>
						</>
						<>
							<AlignInOneLine>
								<ToDoListIcon style={{ height: '17px', width: '17px' }} />
								<FieldName>To-do list</FieldName>
							</AlignInOneLine>
						</>
						<>
							<AlignInOneLine>
								<FieldName>Activity</FieldName>
							</AlignInOneLine>
							<ModalForm isActivityClicked={isActivityClicked}>
								<Textarea
									className="activity"
									onFocus={handleActivityChange}
									placeholder="Write a comment"
									isActivity={true}
									isBorder={false}
								/>
								<SubmitButton>Save</SubmitButton>
							</ModalForm>
						</>
					</CardDetailsContainer>

					<SideMenuModal handleSideMenuclick={handleSideMenuclick} />
				</ModalInner>
			</ModalOuter>
		</Backdrop>
	);
}

export default Modal;
