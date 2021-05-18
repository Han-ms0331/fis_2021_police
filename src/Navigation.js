import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
	return (
		<div>
			<Link to='/home'>Home</Link>
			<Link to='/schedule'>Schedule</Link>
			<Link to='/logout'>Logout</Link>
		</div>
	);
}

export default Navigation;
