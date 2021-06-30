import React from 'react';
import { Link } from 'react-router-dom';
import './css/Navigation.css';
import imgA from './image/fislogo.png';
import axios from 'axios';

function Navigation(props) {
	const { currentPage, setCurrentPage, result_array3 ,setResult_array3 } = props;
	const cur_name = localStorage.getItem('userName');
	const onClick = async (e) => {
		e.preventDefault();
		if (e.target.name === 'center_management') {
			setCurrentPage('center_management');
		} else if (e.target.name === 'schedule_management') {
			setCurrentPage('schedule_management');
		} else if (e.target.name === 'reading_schedule') {
			setCurrentPage('reading_schedule');
		} else if (e.target.name === 'center_delete_put') {
			setCurrentPage('center_delete_put');
		} else if (e.target.name === 'agent_delete_put') {
			setCurrentPage('agent_delete_put');
		} else if (e.target.name === 'print') {
			setCurrentPage('print');
		} else if (e.target.name === 'reading_mail') {
			const result = await axios.get(`http://192.168.0.117:3000/readingmail/read`);
			console.log(result);
			await setResult_array3(result.data);
			setCurrentPage('reading_mail');
		}
		console.log(currentPage);
	};
	if (cur_name === 'admin') {
		return (
			<div class='navigation-container-admin'>
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
				<div
					name='reading_schedule'
					class={
						currentPage === 'reading_schedule'
							? 'navigation-item-select'
							: 'navigation-item'
					}
					onClick={onClick}>
					<Link name='reading_schedule' class='item' to='/readingschedule'>
						전체일정 조회
					</Link>
				</div>
				<div
					name='center_delete_put'
					class={
						currentPage === 'center_delete_put'
							? 'navigation-item-select'
							: 'navigation-item'
					}
					onClick={onClick}>
					<Link name='center_delete_put' class='item' to='/center_manage'>
						시설 정보 수정
					</Link>
				</div>
				<div
					name='agent_delete_put'
					class={
						currentPage === 'agent_delete_put'
							? 'navigation-item-select'
							: 'navigation-item'
					}
					onClick={onClick}>
					<Link name='agent_delete_put' class='item' to='/agentemanagement'>
						직원 정보 수정
					</Link>
				</div>
				<div
					name='print'
					class={
						currentPage === 'print'
							? 'navigation-item-select'
							: 'navigation-item'
					}
					onClick={onClick}>
					<Link name='print' class='item' to='/statistic'>
						통계 및 기록
					</Link>
				</div>
				<div
					name='reading_mail'
					class={
						currentPage === 'reading_mail'
							? 'navigation-item-select'
							: 'navigation-item'
					}
					onClick={onClick}>
					<Link name='reading_mail' class='item' to='/readingmail'>
						실패메일
					</Link>
				</div>
				<div name='logout' class='navigation-item'>
					<Link class='item' to='/logout'>
						Logout
					</Link>
				</div>
			</div>
		);
	} else {
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
						일정 관리
					</Link>
				</div>
				<div
					name='reading_schedule'
					class={
						currentPage === 'reading_schedule'
							? 'navigation-item-select'
							: 'navigation-item'
					}
					onClick={onClick}>
					<Link name='reading_schedule' class='item' to='/readingschedule'>
						전체일정 조회
					</Link>
				</div>
				{/* <div
					name='reading_mail'
					class={
						currentPage === 'reading_mail'
							? 'navigation-item-select'
							: 'navigation-item'
					}
					onClick={onClick}>
					<Link name='reading_mail' class='item' to='/readingmail'>
						실패메일
					</Link>
				</div> */}
				<div name='logout' class='navigation-item'>
					<Link class='item' to='/logout'>
						Logout
					</Link>
				</div>
			</div>
		);
	}
}

export default Navigation;
