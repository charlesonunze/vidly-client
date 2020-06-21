import React, { Component } from 'react';
import FormInput from './FormInput';

class LoginForm extends Component {
	state = {
		account: {
			username: '',
			password: ''
		},
		errors: {}
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
		const { username, password } = { ...this.state.account };
		const errors = {};

		if (username.trim().length < 1) errors.username = 'Username is required';
		if (password.trim().length < 1) errors.password = 'Password is required';

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
