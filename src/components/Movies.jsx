import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import MoviesTable from './MoviesTable';
import Pagination from './reusable/Pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './reusable/ListGroup';
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
		const originalMovies = this.state.movies;
		const movies = originalMovies.filter((movie) => movie._id !== id);
		this.setState({ movies });

		try {
			await deleteMovie(id);
			toast.success('Post deleted.');
		} catch (error) {
			if (error.response && error.response.status === 404) {
				toast.error(`Post has already been deleted or doesn't exist.`);
			}

			if (error.response && (error.response.status === 403 || 400)) {
				toast.error(`You can't perfom this action.`);
			}

			this.setState({ movies: originalMovies });
		}
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

		const user = this.props.user;

		return (
			<div className='row'>
				<ToastContainer />

				<div className='col-3'>
					<ListGroup
						items={allGenres}
						onItemSelect={this.genreSelectHandler}
						selectedItem={this.state.selectedGenre}
					/>
				</div>

				<div className='col'>
					{user && (
						<Link className='btn btn-primary mb-4' to='/movies/new'>
							New Movie
						</Link>
					)}

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
