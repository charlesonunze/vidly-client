import React, { Component } from 'react';
import Like from './reusable/Like';
import Table from './reusable/Table';

class MoviesTable extends Component {
	columns = [
		{ path: 'title', label: 'Title' },
		{ path: 'genre.name', label: 'Genre' },
		{ path: 'numberInStock', label: 'Stock' },
		{ path: 'dailyRentalRate', label: 'Rate' },
		{
			key: 'like',
			content: (movie) => {
				return (
					<Like
						liked={movie.liked}
						handleLike={() => this.props.onLike(movie._id)}
					/>
				);
			}
		},
		{
			key: 'delete',
			content: (movie) => {
				return (
					<button
						className='btn btn-sm btn-danger'
						onClick={() => this.props.onDelete(movie._id)}
					>
						Delete
					</button>
				);
			}
		}
	];

	render() {
		const { movies, sortColumn, onSort } = this.props;

		return (
			<Table
				data={movies}
				columns={this.columns}
				onSort={onSort}
				sortColumn={sortColumn}
			/>
		);
	}
}

export default MoviesTable;
