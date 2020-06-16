import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './reusable/Like';
import Pagination from './reusable/Pagination';
import { paginate } from '../utils/paginate';

class Movies extends Component {
	state = {
		movies: getMovies(),
		pageSize: 3,
		currentPage: 1
	};

	deleteMovieHandler = (id) => {
		const movies = [...this.state.movies].filter((movie) => movie._id !== id);
		this.setState({ movies });
	};

	likeMovieHandler = (movieId) => {
		// Probably not the most efficient way to do this 🙃
		const movies = [...this.state.movies].map((movie) => {
			if (movie._id === movieId) {
				return { ...movie, liked: !movie.liked };
			}
			return movie;
		});

		this.setState({ movies });
	};

	pageChangeHandler = (page) => {
		this.setState({ currentPage: page });
	};

	render() {
		const { length: movieLength } = this.state.movies;
		const { movies: allMovies, pageSize, currentPage } = this.state;

		if (movieLength < 1)
			return (
				<h6>
					There are no movies in the database
					<span role='img' aria-label='sad-emoji'>
						😞
					</span>
				</h6>
			);

		const movies = paginate(allMovies, currentPage, pageSize);

		return (
			<div className='container-fluid'>
				<h6>Showing {movies.length} movies in the database.</h6>

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
									<Like
										liked={movie.liked}
										handleLike={() => this.likeMovieHandler(movie._id)}
									/>
								</td>
								<td>
									<button
										className='btn btn-sm btn-danger'
										onClick={() => this.deleteMovieHandler(movie._id)}
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<Pagination
					pageSize={pageSize}
					currentPage={currentPage}
					moviesCount={allMovies.length}
					onPageChange={this.pageChangeHandler}
				/>
			</div>
		);
	}
}

export default Movies;
