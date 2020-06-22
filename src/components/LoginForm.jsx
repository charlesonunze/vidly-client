import React, { Component } from 'react';
import Joi from 'joi-browser';
import FormInput from './FormInput';

class LoginForm extends Component {
	state = {
		account: {
			username: '',
			password: ''
		},
		errors: {}
	};

	schema = {
		username: Joi.string().required().label('Username'),
		password: Joi.string().required().label('Password')
	};

	formSubmitHandler = (e) => {
		e.preventDefault();

		const { username, password } = this.validateInput();
		if (username || password) return;

		console.log('Submit me bitch!');
	};

	onChangeHandler = ({ currentTarget: input }) => {
		const account = { ...this.state.account };
		account[input.name] = input.value;
		this.setState({ account });
	};

	validateInput = () => {
		const errors = {};
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.account, this.schema, options);

		if (!error) return errors;

		for (let details of error.details) {
			errors[details.path[0]] = details.message;
		}

		this.setState({ errors });
		return errors;
	};

	render() {
		const { account, errors } = this.state;

		return (
			<div className='container'>
				<h1>Login</h1>

				<form onSubmit={this.formSubmitHandler}>
					<FormInput
						type='text'
						name='username'
						label='Username'
						error={errors.username}
						value={account.username}
						onChangeHandler={this.onChangeHandler}
					/>

					<FormInput
						type='password'
						name='password'
						label='Password'
						error={errors.password}
						value={account.password}
						onChangeHandler={this.onChangeHandler}
					/>

					<button type='submit' className='btn btn-primary'>
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default LoginForm;
