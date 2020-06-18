import React from 'react';
import Like from './reusable/Like';

const MoviesTable = (props) => {
	const { movies, onDelete, onLike, onSort } = props;

	return (
		<table className='table'>
			<thead>
				<tr>
					<th onClick={() => onSort('title')}>Title</th>
					<th onClick={() => onSort('genre.name')}>Genre</th>
					<th onClick={() => onSort('stock')}>Stock</th>
					<th onClick={() => onSort('rate')}>Rate</th>
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
