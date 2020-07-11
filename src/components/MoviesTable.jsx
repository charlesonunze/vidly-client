import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Like from './reusable/Like';
import Table from './reusable/Table';
import { getCurrentUser } from '../services/authService';

class MoviesTable extends Component {
	columns = [
		{
			path: 'title',
			label: 'Title',
			content: (movie) => {
				return (
					<Link
						className='nav-link'
						to={`/movies/${movie._id}`}
						style={{ textDecoration: 'underline' }}
					>
						{movie.title}
					</Link>
				);
			}
		},
		{ path: 'genre.name', label: 'Genre' },
		{ path: 'numberInStock', label: 'Stock' },
		{ path: 'dailyRentalRate', label: 'Rate' },
		{
			key: 'like',
			content: (movie) => {
				const user = getCurrentUser();

				return user && user.isAdmin ? (
					<Like
						liked={movie.liked}
						handleLike={() => this.props.onLike(movie._id)}
					/>
				) : null;
			}
		},
		{
			key: 'delete',
			content: (movie) => {
				const user = getCurrentUser();

				return user && user.isAdmin ? (
					<button
						className='btn btn-sm btn-danger'
						onClick={() => this.props.onDelete(movie._id)}
					>
						Delete
					</button>
				) : null;
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
