import React, { useState } from 'react';
import styled from 'styled-components';
import EditMenu from './NestedEditMenu/NestedEditMenu';
import { ReactComponent as EditIcon } from '../../../../../assets/icons/edit.svg';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';
const HiddenNestedMenu = styled.div`
	background-color: white;
	padding: 1rem 1.5rem;
	width: 30.4rem;
	position: absolute;
	color: #4c5b76;
	left: ${({ x }) => x + 'px'};
	top: ${({ height, y }) => y + height + 10 + 'px'};
	pointer-events: ${({ isVisible }) => (isVisible ? 'all' : 'none')};
	opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
	z-index: 50;
	@media (max-width: 1000px) {
		left: calc(100% - 31.5rem);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
	}
`;
const HiddenNestedMenuRelative = styled.div`
	position: relative;
	overflow: hidden;
`;
const NestetMenuTitle = styled.p`
	border-bottom: 1px solid #bdc3c7;
	font-size: 1.4rem;
	font-weight: 400;
	text-align: center;
	padding-bottom: 1rem;
`;
const LabelUl = styled.ul`
	padding: 0;
	margin: 0;
	list-style-type: none;
`;

const LabelLi = styled.li`
	display: flex;
	align-items: center;
	margin: 0.6rem 0;
`;

const LabelColor = styled.div`
	width: 100%;
	padding: 0.7rem 1.6rem;
	background-color: ${({ color }) => (color ? `${color}` : 'white')};
	border-radius: 8px;
	color: white;
	font-weight: normal;
	font-size: 1.4rem;
`;
const EditButton = styled.button`
	border: none;
	background-color: transparent;
	margin-left: 1.6rem;
	margin-right: 0.5rem;
	&:active {
		outline: none;
	}
	& svg {
		width: 2.2rem;
		height: 2.2rem;
	}
`;

function NestedMenu({
	isSideMenuClicked,
	labels,
	editLabel,
	boardId,
	handleLabelClick,
}) {
	const [isEdit, setEdit] = useState(false);
	const [selectedLabel, setLabel] = useState(null);
	const labelsArray = labels.labelArray.map((labelId) => labels[labelId]);
	const handleEditMenu = (labelId) => {
		setEdit(!isEdit);
		setLabel(labelId);
	};
	const handleEditChange = (e) => {
		e.preventDefault();
		const { value } = e.target.elements[0];
		editLabel(boardId, selectedLabel, value);
		setEdit(!isEdit);
		e.target.reset();
	};

	return (
		<HiddenNestedMenu
			x={isSideMenuClicked.x}
			y={isSideMenuClicked.y}
			height={isSideMenuClicked.height}
			isVisible={isSideMenuClicked.isOpen}
		>
			<HiddenNestedMenuRelative>
				<NestetMenuTitle>Labels</NestetMenuTitle>
				<div>
					<LabelUl>
						<EditMenu
							h
							handleEditChange={handleEditChange}
							isSideMenuClicked={isSideMenuClicked}
							isEdit={isEdit}
							handleEditMenu={handleEditMenu}
						/>
						{labelsArray.map(({ id, bgColor, content }) => (
							<LabelLi key={id}>
								<LabelColor
									onClick={() => handleLabelClick(id)}
									color={bgColor}
								>
									{content}
								</LabelColor>
								<EditButton onClick={() => handleEditMenu(id)}>
									<EditIcon />
								</EditButton>
							</LabelLi>
						))}
					</LabelUl>
				</div>
			</HiddenNestedMenuRelative>
		</HiddenNestedMenu>
	);
}
const mapStateToDispatch = (dispatch) => {
	return {
		editLabel: (boardId, labelId, labelContent) =>
			dispatch(actions.editLabel(boardId, labelId, labelContent)),
	};
};
export default connect(null, mapStateToDispatch)(NestedMenu);
