import React, { Component } from 'react';
import Like from './reusable/Like';
import TableHeader from './reusable/TableHeader';

class MoviesTable extends Component {
	columns = [
		{ path: 'title', label: 'Title' },
		{ path: 'genre.name', label: 'Genre' },
		{ path: 'numberInStock', label: 'Stock' },
		{ path: 'dailyRentalRate', label: 'Rate' },
		{ key: 'like' },
		{ key: 'delete' }
	];

	render() {
		const { movies, sortColumn, onDelete, onLike, onSort } = this.props;

		return (
			<table className='table'>
				<TableHeader
					columns={this.columns}
					onSort={onSort}
					sortColumn={sortColumn}
				/>

				<tbody>
					{movies.map((movie, index) => (
						<tr key={index}>
							<td>{movie.title}</td>
							<td>{movie.genre.name}</td>
							<td>{movie.numberInStock}</td>
							<td>${movie.dailyRentalRate}</td>
							<td>
								<Like
									liked={movie.liked}
									handleLike={() => onLike(movie._id)}
								/>
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
	}
}

export default MoviesTable;
