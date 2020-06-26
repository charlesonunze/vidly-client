import React from 'react';
import Joi from 'joi-browser';
import Form from './reusable/Form';
import { getGenres } from '../services/fakeGenreService';
import { saveMovie } from '../services/fakeMovieService';

class MoviesForm extends Form {
	state = {
		data: {
			title: '',
			genre: '',
			numberInStock: '',
			dailyRentalRate: '',
			liked: false
		},
		genres: [],
		errors: {}
	};

	componentDidMount() {
		const genres = getGenres();
		const data = { ...this.state.data };
		data.genre = genres[0];
		this.setState({
			genres,
			data
		});
	}

	schema = {
		title: Joi.string().required().label('title'),
		genre: Joi.string(),
		numberInStock: Joi.string().required().label('Number in Stock'),
		dailyRentalRate: Joi.string().required().label('Rate'),
		liked: Joi.boolean()
	};

	submitForm = () => {
		const { history } = this.props;
		const { data: movie, genres } = { ...this.state };
		const genre = genres.find((genre) => genre.name === movie.genre);

		if (genre) {
			movie.genreId = genre._id;
			saveMovie(movie);
			history.replace('/movies');
		}
	};

	render() {
		const { match } = this.props;
		const { genres } = this.state;

		const genresList = genres.map((g) => {
			return g.name;
		});

		return (
			<div className='container'>
				<h1>Movie Form {match.params.id} </h1>

				<form onSubmit={this.formSubmitHandler}>
					{this.renderFormInput('text', 'title', 'title')}
					{this.renderFormList('genre', 'Genres', genresList)}
					{this.renderFormInput('text', 'numberInStock', 'Number in Stock')}
					{this.renderFormInput('textarea', 'dailyRentalRate', 'Rate')}
					{this.renderSubmitButton('Save')}
				</form>
			</div>
		);
	}
}

export default MoviesForm;
