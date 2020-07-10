import React from 'react';
import Joi from 'joi-browser';
import Form from './reusable/Form';
import { registerUser } from '../services/userService';

class RegisterForm extends Form {
	state = {
		data: {
			name: '',
			email: '',
			password: ''
		},
		errors: {}
	};

	schema = {
		name: Joi.string().required().min(2).label('Name'),
		email: Joi.string().email().required().label('Email'),
		password: Joi.string().required().label('Password')
	};

	submitForm = async () => {
		const { name, email, password } = this.state.data;

		try {
			const response = await registerUser({ name, email, password });
			localStorage.setItem('token', response.headers['x-auth-token']);
			this.props.history.replace('/movies');
		} catch (error) {
			if (error.response && error.response.status === 400) {
				const errors = { ...this.state.errors };
				errors.email = error.response.data;
				this.setState({ errors });
			}
		}
	};

	render() {
		return (
			<div className='container'>
				<h1>Register</h1>

				<form onSubmit={this.formSubmitHandler}>
					{this.renderFormInput('text', 'name', 'Name')}
					{this.renderFormInput('email', 'email', 'Email')}
					{this.renderFormInput('password', 'password', 'Password')}
					{this.renderSubmitButton('Register')}
				</form>
			</div>
		);
	}
}

export default RegisterForm;
