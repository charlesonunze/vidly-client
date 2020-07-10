import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import MoviesTable from './MoviesTable';
import Pagination from './reusable/Pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './reusable/ListGroup';
import _ from 'lodash';
import FormInput from './reusable/FormInput';

class Movies extends Component {
	state = {
		movies: [],
		moviesCopy: [],
		genres: [],
		pageSize: 3,
		currentPage: 1,
		sortColumn: {
			path: 'title',
			order: 'asc'
		},
		selectedGenre: { _id: '', name: 'All Genres' }
	};

	async componentDidMount() {
		const movies = await getMovies();
		const genres = await getGenres();
		this.setState({
			movies,
			moviesCopy: [...movies],
			genres: [{ _id: '', name: 'All Genres' }, ...genres]
		});
	}

	searchMovieHandler = ({ currentTarget: input }) => {
		const movies = [...this.state.moviesCopy];

		const searchResult = movies.filter((movie) => {
			return movie.title.toLowerCase().includes(input.value);
		});

		if (searchResult.length < 1) return;

		this.setState({
			movies: searchResult,
			currentPage: 1,
			selectedGenre: { _id: '', name: 'All Genres' }
		});
	};

	deleteMovieHandler = async (id) => {
		const movies = [...this.state.movies].filter((movie) => movie._id !== id);
		this.setState({ movies });
		await deleteMovie(id);
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

	sortMoviesHandler = (sortColumn) => {
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
					<Link className='btn btn-primary mb-4' to='/movies/new'>
						New Movie
					</Link>

					<h6 className='mb-0'>
						Showing {filteredMovies.length} movies in the database.
					</h6>

					<FormInput
						type='text'
						name='search'
						placeholder='Search'
						onChangeHandler={this.searchMovieHandler}
					/>

					<MoviesTable
						movies={movies}
						sortColumn={sortColumn}
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
