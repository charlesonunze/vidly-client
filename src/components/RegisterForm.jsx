import React from 'react';
import Joi from 'joi-browser';
import Form from './reusable/Form';

class RegisterForm extends Form {
	state = {
		data: {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: ''
		},
		errors: {}
	};

	schema = {
		firstName: Joi.string().required().max(10).label('First name'),
		lastName: Joi.string().required().max(10).label('Last name'),
		username: Joi.string().required().label('Username'),
		email: Joi.string().email().required().label('Email'),
		password: Joi.string().required().label('Password')
	};

	submitForm = () => {
		console.log('Submit me bitch!');
	};

	render() {
		return (
			<div className='container'>
				<h1>Register</h1>

				<form onSubmit={this.formSubmitHandler}>
					{this.renderFormInput('text', 'firstName', 'First name')}
					{this.renderFormInput('text', 'lastName', 'Last name')}
					{this.renderFormInput('text', 'username', 'Username')}
					{this.renderFormInput('email', 'email', 'Email')}
					{this.renderFormInput('password', 'password', 'Password')}
					{this.renderSubmitButton('Register')}
				</form>
			</div>
		);
	}
}

export default RegisterForm;
