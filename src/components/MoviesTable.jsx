import React from 'react';
import Like from './reusable/Like';

const MoviesTable = (props) => {
	const { movies, onDelete, onLike } = props;

	return (
		<table className='table'>
			<thead>
				<tr>
					<th>Title</th>
					<th>Genre</th>
					<th>Stock</th>
					<th>Rate</th>
					<th></th>
				</tr>
			</thead>

			<tbody>
				{movies.map((movie, index) => (
					<tr key={index}>
						<td>{movie.title}</td>
						<td>{movie.genre.name}</td>
						<td>{movie.numberInStock}</td>
						<td>${movie.dailyRentalRate}</td>
						<td>
							<Like liked={movie.liked} handleLike={() => onLike(movie._id)} />
						</td>
						<td>
							<button
								className='btn btn-sm btn-danger'
								onClick={() => onDelete(movie._id)}
							>
								Delete
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default MoviesTable;
