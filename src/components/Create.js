import React, { useState } from 'react';
import './Create.css';

export default function Create(props) {
	const [newBookmark, setNewBookmark] = useState({
		name: '',
		link: ''
	});

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			const response = await fetch('/api/bookmarks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newBookmark)
			});
			const data = await response.json();
			props.setBookmarks([...props.bookmarks, data]);
			setNewBookmark({
				name: '',
				link: ''
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = e => {
		setNewBookmark({ ...newBookmark, [e.target.id]: e.target.value });
	};

	return (
		<div className="CreatePage">
			<button
				className="btn btn-primary"
				type="button"
				data-toggle="collapse"
				data-target="#collapseExample"
				aria-expanded="false"
				aria-controls="collapseExample"
			>
				Create a New Bookmark
			</button>
			<div className="collapse" id="collapseExample">
				<form onSubmit={handleSubmit}>
					<label>Website Name: </label>
					<input
						type="text"
						id="name"
						value={newBookmark.name}
						onChange={handleChange}
						className="website-input"
					/>
					<label>Website Link: </label>
					<input
						type="text"
						id="link"
						value={newBookmark.link || 'http://'}
						onChange={handleChange}
						className="website-link"
					/>
					<input type="submit" value="Add Bookmark" className="add-btn" />
				</form>
			</div>
		</div>
	);
}
