import React, { useState } from 'react';
import styled from 'styled-components';
import EditMenu from './NestedEditMenu/NestedEditMenu';
import { ReactComponent as EditIcon } from '../../../../../assets/icons/edit.svg';

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
	background-color: #61bd4f;
	border-radius: 8px;
	color: white;
	font-weight: normal;
	font-size: 1.6rem;
`;
const EditButton = styled.button`
	border: none;
	background-color: transparent;
	margin-left: 16px;
	margin-right: 5px;
	&:active {
		outline: none;
	}
`;

function NestedMenu({ buttonType, isSideMenuClicked }) {
	let container;
	const [isEdit, setEdit] = useState(false);
	const handleEditMenu = () => setEdit(!isEdit);

	switch (buttonType) {
		case 'label':
			container = (
				<div>
					<LabelUl>
						<EditMenu
							isSideMenuClicked={isSideMenuClicked}
							isEdit={isEdit}
							handleEditMenu={handleEditMenu}
						/>
						<LabelLi>
							<LabelColor>Test</LabelColor>
							<EditButton onClick={handleEditMenu}>
								<EditIcon style={{ height: '24px', width: '24px' }} />
							</EditButton>
						</LabelLi>
						<LabelLi>
							<LabelColor>Test</LabelColor>
							<EditButton onClick={handleEditMenu}>
								<EditIcon style={{ height: '24px', width: '24px' }} />
							</EditButton>
						</LabelLi>
						<LabelLi>
							<LabelColor>Test</LabelColor>
							<EditButton onClick={handleEditMenu}>
								<EditIcon style={{ height: '24px', width: '24px' }} />
							</EditButton>
						</LabelLi>
					</LabelUl>
				</div>
			);
			break;

		default:
			container = null;
	}
	return (
		<HiddenNestedMenu
			x={isSideMenuClicked.x}
			y={isSideMenuClicked.y}
			height={isSideMenuClicked.height}
			isVisible={isSideMenuClicked.isOpen}
		>
			<HiddenNestedMenuRelative>
				<NestetMenuTitle>Labels</NestetMenuTitle>
				{container}
			</HiddenNestedMenuRelative>
		</HiddenNestedMenu>
	);
}

export default NestedMenu;
