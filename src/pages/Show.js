import React, { useState, useEffect, useRef } from 'react';

export default function Show(props) {
	const [bookmark, setBookmark] = useState({});
	const nameInput = useRef(null);
	const linkInput = useRef(null);

	const handleUpdate = async event => {
		event.preventDefault();
		try {
			const response = await fetch(`/api/bookmarks/${props.match.params.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: nameInput.current.value,
					link: linkInput.current.value
				})
			});
			const data = await response.json();
			setBookmark(data);
			nameInput.current.value = '';
			linkInput.current.value = 'http://';
			// console.log(enteredLink);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/bookmarks/${props.match.params.id}`);
				const data = await response.json();
				setBookmark(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const handleDelete = async e => {
		try {
			const response = await fetch(`/api/bookmarks/${props.match.params.id}`, {
				method: 'DELETE',
				header: {
					'Content-Type': 'application/json'
				}
			});
			const deletedBookmark = await response.json();
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/home');
			//is this like redirect? why is it taking so long with blogs?
		}
	};

	return (
		<div className="ShowPage container">
			<div className="jumbotron">
				{Object.keys(bookmark).length ? (
					<>
						<h3>{bookmark.name}</h3>

						<a
							href={bookmark._id}
							onClick={() => window.open(bookmark.link, '_blank')}
						>
							<p>{bookmark.link}</p>
						</a>

						<button className="btn btn-danger" onClick={handleDelete}>
							Delete Bookmark
						</button>
					</>
				) : (
					<h1>Loading ...</h1>
				)}
				<button
					className="btn btn-primary"
					type="button"
					data-toggle="collapse"
					data-target="#collapseExample"
					aria-expanded="false"
					aria-controls="collapseExample"
				>
					Update Bookmark
				</button>
				<div className="collapse" id="collapseExample">
					<form
						style={{ display: 'flex', flexDirection: 'column' }}
						onSubmit={handleUpdate}
					>
						<label>
							{' '}
							Website Name:{' '}
							<input type="text" ref={nameInput} defaultValue="" />
						</label>
						<label>
							{' '}
							Link: <input type="text" ref={linkInput} defaultValue="http://" />
						</label>
						<button
							type="submit"
							value="Submit Update"
							className="btn btn-success"
							data-target="#collapseExample"
							data-toggle="collapse"
							aria-expanded="false"
							aria-controls="collapseExample"
						>
							Submit Update
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
