import React, { Component } from 'react';
import Like from './reusable/Like';

class MoviesTable extends Component {
	raiseSortEvent = (path) => {
		const { sortColumn, onSort } = this.props;

		if (sortColumn.path === path) {
			sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn.path = path;
			sortColumn.order = 'asc';
		}

		onSort(sortColumn);
	};

	render() {
		const { movies, onDelete, onLike } = this.props;

		return (
			<table className='table'>
				<thead>
					<tr>
						<th onClick={() => this.raiseSortEvent('title')}>Title</th>
						<th onClick={() => this.raiseSortEvent('genre.name')}>Genre</th>
						<th onClick={() => this.raiseSortEvent('numberInStock')}>Stock</th>
						<th onClick={() => this.raiseSortEvent('dailyRentalRate')}>Rate</th>
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
