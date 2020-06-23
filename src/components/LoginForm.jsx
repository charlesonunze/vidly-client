import React from 'react';
import Joi from 'joi-browser';
import Form from './reusable/Form';

class LoginForm extends Form {
	state = {
		data: { username: '', password: '' },
		errors: {}
	};

	schema = {
		username: Joi.string().required().label('Username'),
		password: Joi.string().required().label('Password')
	};

	submitForm = () => {
		console.log('Submit me bitch!');
	};

	render() {
		return (
			<div className='container'>
				<h1>Login</h1>

				<form onSubmit={this.formSubmitHandler}>
					{this.renderFormInput('text', 'username', 'Username')}
					{this.renderFormInput('password', 'password', 'Password')}
					{this.renderSubmitButton('Login')}
				</form>
			</div>
		);
	}
}

export default LoginForm;
