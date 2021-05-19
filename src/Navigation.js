import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Navigation.css';
<<<<<<< HEAD

=======
>>>>>>> 89953f4038ae13c0af20d5b373c6ee1e07e29d8e
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
