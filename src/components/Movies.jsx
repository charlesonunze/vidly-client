import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './MoviesTable';
import Pagination from './reusable/Pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './reusable/ListGroup';
import _ from 'lodash';

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 3,
		currentPage: 1,
		sortColumn: {
			path: 'title',
			order: 'asc'
		}
	};

	componentDidMount() {
		this.setState({
			movies: getMovies(),
			genres: [{ _id: '', name: 'All Genres' }, ...getGenres()]
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

	sortMoviesHandler = (path) => {
		const sortColumn = { ...this.state.sortColumn };

		if (sortColumn.path === path) {
			sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn.path = path;
			sortColumn.order = 'asc';
		}

		this.setState({ sortColumn });
	};

	render() {
		const {
			movies: allMovies,
			genres: allGenres,
			pageSize,
			currentPage,
			selectedGenre,
			sortColumn
		} = this.state;

		if (allMovies.length < 1) {
			return (
				<h6>
					There are no movies in the database
					<span role='img' aria-label='sad-emoji'>
						😞
					</span>
				</h6>
			);
		}

		const filteredMovies =
			selectedGenre && selectedGenre._id
				? allMovies.filter((movie) => {
						return movie.genre._id === selectedGenre._id;
				  })
				: allMovies;

		const sortedMovies = _.orderBy(
			filteredMovies,
			[sortColumn.path],
			[sortColumn.order]
		);

		const movies = paginate(sortedMovies, currentPage, pageSize);

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

					<MoviesTable
						movies={movies}
						onLike={this.likeMovieHandler}
						onSort={this.sortMoviesHandler}
						onDelete={this.deleteMovieHandler}
					/>

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
