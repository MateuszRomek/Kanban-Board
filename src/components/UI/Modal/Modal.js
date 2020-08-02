import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as DescriptionIcon } from '../../../assets/icons/description.svg';
import { ReactComponent as ToDoListIcon } from '../../../assets/icons/todolist.svg';
import { ReactComponent as CommentsIcon } from '../../../assets/icons/comment-solid.svg';
import { withRouter } from 'react-router-dom';
import { ModalContext } from '../../../context/ModalContext';
import { compose } from 'redux';
import { connect } from 'react-redux';
import SideMenuModal from './SideMenuModal/SideMenuModal';
import NestedMenu from './SideMenuModal/NestedMenu/NestedMenu';
import GreenButton from './ModalButtons/GreenButton';
import ToDoList from './ToDoList/ToDoList';
import * as actions from '../../../store/actions';
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
	position: relative;
	margin: ${({ isFirst }) =>
		isFirst ? '0rem 0rem 2rem 0rem' : '2.5rem 0rem 2rem 0rem'};
	width: 100%;
	padding: 1rem;
	background-color: white;
	font-size: 1.4rem;
	border-radius: 5px;
	border: 1px solid rgba(55, 60, 63, 0.3);
`;

const DeleteComment = styled.span`
	position: absolute;
	left: 0;
	bottom: -2rem;
	color: inherit;
	font-size: 1.1rem;
	font-weight: 400;
	text-decoration: underline;
`;
const Modal = ({
	history,
	location,
	addNewComment,
	boardId,
	removeComment,
}) => {
	const [isActivityClicked, setActivity] = useState(false);
	const [isMenuClicked, setMenuData] = useState({
		isOpen: false,
		x: 0,
		y: 0,
		height: 0,
	});
	const { isModalOpen, handleModalChange, openedTask, taskColumn } = useContext(
		ModalContext
	);
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
			history.goBack();
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

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const commentContent = e.target.elements['content'].value;
		addNewComment(openedTask.id, boardId, commentContent);
		e.target.reset();
	};

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
						<ModalInputTitle value={(openedTask && openedTask.title) || ''} />
						<>
							<AlignInOneLine>
								<DescriptionIcon />
								<FieldName>Description</FieldName>
							</AlignInOneLine>
							<Textarea
								value={(openedTask && openedTask.description) || ''}
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

							<ModalForm
								onSubmit={handleFormSubmit}
								isActivityClicked={isActivityClicked}
							>
								<Textarea
									name="content"
									className="activity"
									onFocus={handleActivityChange}
									placeholder="Write a comment"
									isActivity={true}
									isBorder={false}
								/>
								<GreenButton type="submit" text={'Save'} />
							</ModalForm>
							<CommentsContainer>
								{openedTask &&
									openedTask.comments.map((comment, index) => (
										<Comment isFirst={index === 0} key={comment.id}>
											{comment.content}{' '}
											<DeleteComment
												onClick={() =>
													removeComment(comment.id, boardId, openedTask.id)
												}
											>
												Delete
											</DeleteComment>
										</Comment>
									))}
							</CommentsContainer>
						</>
					</CardDetailsContainer>

					<SideMenuModal
						boardId={boardId}
						handleModalChange={handleModalChange}
						taskColumn={taskColumn}
						location={location}
						cardId={(openedTask && openedTask.id) || null}
						handleSideMenuclick={handleSideMenuclick}
					/>
				</ModalInner>
			</ModalOuter>
		</Backdrop>
	);
};
const mapDispatchToProps = (dispatch) => {
	return {
		addNewComment: (cardId, boardId, commentContent) =>
			dispatch(actions.addNewComment(cardId, boardId, commentContent)),

		removeComment: (commentId, boardId, cardId) =>
			dispatch(actions.removeComment(commentId, boardId, cardId)),
	};
};
export default compose(withRouter, connect(null, mapDispatchToProps))(Modal);
