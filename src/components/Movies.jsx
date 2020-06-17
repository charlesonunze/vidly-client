import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Like from './reusable/Like';
import Pagination from './reusable/Pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './reusable/ListGroup';

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 3,
		currentPage: 1
	};

	componentDidMount() {
		this.setState({
			movies: getMovies(),
			genres: [{ name: 'All Genres' }, ...getGenres()]
		});
	}

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

	genreSelectHandler = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	render() {
		const {
			movies: allMovies,
			genres: allGenres,
			pageSize,
			currentPage,
			selectedGenre
		} = this.state;

		if (allMovies.length < 1)
			return (
				<h6>
					There are no movies in the database
					<span role='img' aria-label='sad-emoji'>
						😞
					</span>
				</h6>
			);

		const filteredMovies =
			selectedGenre && selectedGenre._id
				? allMovies.filter((movie) => {
						return movie.genre._id === selectedGenre._id;
				  })
				: allMovies;

		const movies = paginate(filteredMovies, currentPage, pageSize);

		return (
			<div className='row'>
				<div className='col-3'>
					<ListGroup
						items={allGenres}
						onItemSelect={this.genreSelectHandler}
						selectedItem={this.state.selectedGenre}
					/>
				</div>

				<div className='col'>
					<h6>Showing {filteredMovies.length} movies in the database.</h6>

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
						moviesCount={filteredMovies.length}
						onPageChange={this.pageChangeHandler}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
