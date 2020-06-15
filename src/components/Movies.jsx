import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
	state = {
		movies: getMovies()
	};

	render() {
		let movies = this.state.movies.map((movie, index) => (
			<tr key={index}>
				<td>{movie.title}</td>
				<td>{movie.genre.name}</td>
				<td>{movie.numberInStock}</td>
				<td>${movie.dailyRentalRate}</td>
			</tr>
		));

		return (
			<table className='table'>
				<thead>
					<tr>
						<th>Title</th>
						<th>Genre</th>
						<th>Stock</th>
						<th>Rate</th>
					</tr>
				</thead>

				<tbody>{movies}</tbody>
			</table>
		);
	}
}

export default Movies;
