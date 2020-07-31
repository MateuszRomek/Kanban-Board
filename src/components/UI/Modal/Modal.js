import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ReactComponent as DescriptionIcon } from '../../../assets/icons/description.svg';
import { ReactComponent as ToDoListIcon } from '../../../assets/icons/todolist.svg';
import { ReactComponent as CommentsIcon } from '../../../assets/icons/comment-solid.svg';
import { useEffect } from 'react';
import { ModalContext } from '../../../context/ModalContext';
import SideMenuModal from './SideMenuModal/SideMenuModal';
import NestedMenu from './SideMenuModal/NestedMenu/NestedMenu';
import GreenButton from './ModalButtons/GreenButton';
import ToDoList from './ToDoList/ToDoList';
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
	z-index: 200;
	opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
	pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};
`;

const ModalOuter = styled.div`
	padding: 1rem 3rem;
	background-color: #f4f5f7;
	height: 60rem;
	width: 65rem;
	transition: transform 0.3s ease, opacity 0.3s ease;
	transform: ${({ isOpen }) =>
		isOpen ? 'translateY(0px)' : 'translateY(-35rem)'};
	opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
	@media (max-width: 700px) {
		width: 100%;
		padding: 1rem 1.5rem;
	}
`;

const ModalInner = styled.div`
	padding: 1rem 0;
	height: 100%;
	color: #4b6584;
	display: grid;
	grid-template-columns: 75% 25%;
`;
const CardDetailsContainer = styled.div`
	overflow: auto;
	overflow-x: hidden;
	padding-right: 0.5rem;
	::-webkit-scrollbar {
		width: 5px;
	}
	::-webkit-scrollbar-track {
		background: transparent;
	}
	::-webkit-scrollbar-thumb {
		background-color: rgb(100, 100, 100);
		border-radius: 20px;
	}
`;
const ModalInputTitle = styled.input.attrs({ type: 'text' })`
	color: inherit;
	border: none;
	font-weight: bold;
	font-size: 23px;
	padding: 1rem 0.5rem;
	margin: 0.3rem 0;
	background-color: transparent;
`;
const AlignInOneLine = styled.div`
	display: flex;
	align-items: center;
	& svg {
		height: 1.6rem;
		width: 1.6rem;
	}
`;

const FieldName = styled.p`
	color: inherit;
	margin-left: 1rem;
	@media (min-width: 320px) and (max-width: 480px) {
		font-size: 1.4rem;
	}
`;
const Textarea = styled.textarea`
	width: 100%;
	min-height: ${(props) => (props.isActivity ? '1rem' : '8.8rem')};
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
const CommentsContainer = styled.div`
	padding: 1rem 0.5rem;
	color: rgb(55, 60, 63);
`;
const Comment = styled.p`
	margin: 0.8rem 0;
	width: 100%;
	padding: 1rem 0.6rem;
	background-color: white;
	border-radius: 5px;
	border: 1px solid rgba(55, 60, 63, 0.3);
`;
function Modal() {
	const [isActivityClicked, setActivity] = useState(false);
	const [isMenuClicked, setMenuData] = useState({
		isOpen: false,
		x: 0,
		y: 0,
		height: 0,
	});
	const { isModalOpen, handleModalChange, openedTask } = useContext(
		ModalContext
	);
	// TODO ogarna opened task do danych w modalu.
	const handleSideMenuclick = (e) => {
		if (!e.target.classList.contains('button-link')) {
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
	const handleOutsideModalClick = (e) => {
		if (e.target.classList.contains('backdrop')) {
			handleModalChange();
			setMenuData({
				...isMenuClicked,
				isOpen: false,
			});
		} else {
			return;
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
		<Backdrop
			onClick={handleOutsideModalClick}
			className="backdrop"
			isOpen={isModalOpen}
		>
			<NestedMenu isSideMenuClicked={isMenuClicked} buttonType="label" />
			<ModalOuter isOpen={isModalOpen}>
				<ModalInner onClick={handleSideMenuclick} className="innerModal">
					<CardDetailsContainer>
						{/* TODO dodać value oraz onchange taska */}
						<ModalInputTitle />
						<>
							<AlignInOneLine>
								<DescriptionIcon />
								<FieldName>Description</FieldName>
							</AlignInOneLine>
							<Textarea
								placeholder="Add a more detailed description"
								isBorder={true}
							/>
						</>
						<>
							<AlignInOneLine>
								<ToDoListIcon />
								<FieldName>To-do list</FieldName>
							</AlignInOneLine>
							<div>
								<ToDoList />
							</div>
						</>
						<>
							<AlignInOneLine>
								<CommentsIcon />
								<FieldName>Comments</FieldName>
							</AlignInOneLine>

							<ModalForm isActivityClicked={isActivityClicked}>
								<Textarea
									className="activity"
									onFocus={handleActivityChange}
									placeholder="Write a comment"
									isActivity={true}
									isBorder={false}
								/>
								<GreenButton text={'Save'} />
							</ModalForm>
							<CommentsContainer>
								<Comment>Dupa</Comment>
							</CommentsContainer>
						</>
					</CardDetailsContainer>

					<SideMenuModal handleSideMenuclick={handleSideMenuclick} />
				</ModalInner>
			</ModalOuter>
		</Backdrop>
	);
}

export default Modal;
