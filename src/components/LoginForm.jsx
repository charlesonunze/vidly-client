import React from 'react';
import Joi from 'joi-browser';
import Form from './reusable/Form';
import { loginUser } from '../services/userService';

class LoginForm extends Form {
	state = {
		data: { email: '', password: '' },
		errors: {}
	};

	schema = {
		email: Joi.string().required().label('Email'),
		password: Joi.string().required().label('Password')
	};

	submitForm = async () => {
		const { email, password } = this.state.data;

		try {
			await loginUser({ email, password });
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
				<h1>Login</h1>

				<form onSubmit={this.formSubmitHandler}>
					{this.renderFormInput('email', 'email', 'Email')}
					{this.renderFormInput('password', 'password', 'Password')}
					{this.renderSubmitButton('Login')}
				</form>
			</div>
		);
	}
}

export default LoginForm;
