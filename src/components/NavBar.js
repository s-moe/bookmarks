import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = props => {
	return (
		<nav className="NavBar nav justify-content-center">
			{props.routes.map(({ key, path }) => (
				<li className="nav-item">
					<Link key={key} to={path} className="nav-link">
						{key}
					</Link>
				</li>
			))}
		</nav>
	);
};

export default NavBar;
