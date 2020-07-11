import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import Form from './reusable/Form';
import { getGenres } from '../services/genreService';
import { saveMovie, getMovie, updateMovie } from '../services/movieService';

class MoviesForm extends Form {
	state = {
		data: {
			title: '',
			genreId: '',
			numberInStock: '',
			dailyRentalRate: ''
		},
		genres: [],
		errors: {}
	};

	async componentDidMount() {
		const genres = await getGenres();
		this.setState({ genres });

		const movieId = this.props.match.params.id;
		if (movieId === 'new') return;

		const movie = await getMovie(movieId);
		if (!movie) return this.props.history.replace('/not-found');

		this.setState({ data: this.mapToViewModel(movie) });
	}

	schema = {
		_id: Joi.string(),
		title: Joi.string().required().label('Title'),
		genreId: Joi.string().required().label('Genre'),
		numberInStock: Joi.number()
			.required()
			.min(0)
			.max(100)
			.label('Number in Stock'),
		dailyRentalRate: Joi.number().required().min(0).max(10).label('Rate')
	};

	mapToViewModel(movie) {
		return {
			_id: movie._id,
			title: movie.title,
			genreId: movie.genre._id,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate
		};
	}

	submitForm = async () => {
		const movie = { ...this.state.data };

		if (movie._id) {
			await updateMovie(movie);
			toast.success('Movie updated.');
		} else {
			await saveMovie(movie);
			toast.success('Movie saved.');
		}

		this.props.history.replace('/movies');
	};

	render() {
		const { genres } = this.state;

		const genresList = genres.map((g) => {
			return { name: g.name, value: g._id };
		});

		return (
			<div className='container'>
				<h1>Movie Form</h1>

				<form onSubmit={this.formSubmitHandler}>
					{this.renderFormInput('text', 'title', 'Title')}
					{this.renderFormList('genreId', 'Genre', genresList)}
					{this.renderFormInput('text', 'numberInStock', 'Number in Stock')}
					{this.renderFormInput('textarea', 'dailyRentalRate', 'Rate')}
					{this.renderSubmitButton('Save')}
				</form>
			</div>
		);
	}
}

export default MoviesForm;
