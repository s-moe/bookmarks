import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Create from '../components/Create';

export default function Home() {
	const [bookmarks, setBookmarks] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/bookmarks');
				const data = await response.json();
				setBookmarks(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	return (
		<div className="HomePage container">
			<Create bookmarks={bookmarks} setBookmarks={setBookmarks} />
			<ul className="row">
				{bookmarks.map(bookmark => {
					return (
						<li key={bookmark._id} className="col-sm-4">
							<div className="card">
								<div className="card-body">
									<h3 className="card-title">{bookmark.name}</h3>

									<a
										href={`/home`}
										onClick={() => window.open(bookmark.link, '_blank')}
									>
										<p>{bookmark.link}</p>
									</a>
									<Link to={`/${bookmark._id}`} className="btn btn-primary">
										{' '}
										Edit bookmark
									</Link>
								</div>{' '}
								{/*card-body div end*/}
							</div>{' '}
							{/*card div end*/}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
