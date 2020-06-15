import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
	state = {
		movies: getMovies()
	};

	deleteMovieHandler = (id) => {
		console.log(typeof id);
		const movies = [...this.state.movies].filter((movie) => movie._id !== id);
		this.setState({ movies });
	};

	render() {
		let movies =
			!this.state.movies || this.state.movies.length < 1 ? (
				<h6>
					There are no movies in the database{' '}
					<span role='img' aria-label='sad-emoji'>
						😞
					</span>
				</h6>
			) : (
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
						{this.state.movies.map((movie, index) => (
							<tr key={index}>
								<td>{movie.title}</td>
								<td>{movie.genre.name}</td>
								<td>{movie.numberInStock}</td>
								<td>${movie.dailyRentalRate}</td>
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
			);

		return movies;
	}
}

export default Movies;
