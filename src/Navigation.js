import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Navigation.css';
function Navigation() {
	return (
		<div class='navigation-container'>
			<div class='navigation-item'>
				<Link class='item' to='/home'>
					시설 관리
				</Link>
			</div>
			<div class='navigation-item'>
				<Link class='item' to='/schedule'>
					일정관리
				</Link>
			</div>
			<div class='navigation-item'>
				<Link class='item' to='/logout'>
					Logout
				</Link>
			</div>
		</div>
	);
}

export default Navigation;
