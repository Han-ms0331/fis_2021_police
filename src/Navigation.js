import React from 'react';
import { Link } from 'react-router-dom';
import './css/Navigation.css';
import imgA from './image/fislogo.png';

function Navigation(props) {
	const { currentPage, setCurrentPage } = props;
	const onClick = (e) => {
		e.preventDefault();
		if (e.target.name === 'center_management') {
			setCurrentPage('center_management');
		} else if (e.target.name === 'schedule_management') {
			setCurrentPage('schedule_management');
		}
		console.log(currentPage);
	};
	return (
		<div class='navigation-container'>
			<img src={imgA} class='logo' width='50px' />
			<div
				name='center_management'
				class={
					currentPage === 'center_management'
						? 'navigation-item-select'
						: 'navigation-item'
				}
				onClick={onClick}>
				<Link name='center_management' class='item' to='/home'>
					시설 관리
				</Link>
			</div>
			<div
				name='schedule_management'
				class={
					currentPage === 'schedule_management'
						? 'navigation-item-select'
						: 'navigation-item'
				}
				onClick={onClick}>
				<Link name='schedule_management' class='item' to='/schedule'>
					일정관리
				</Link>
			</div>
			<div name='logout' class='navigation-item'>
				<Link class='item' to='/logout'>
					Logout
				</Link>
			</div>
		</div>
	);
}

export default Navigation;
