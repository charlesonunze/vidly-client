import React, { Component } from 'react';
import FormInput from './FormInput';

class LoginForm extends Component {
	state = {
		account: {
			username: '',
			password: ''
		}
	};

	formSubmitHandler = (e) => {
		e.preventDefault();
		console.log('sub');
	};

	onChangeHandler = ({ currentTarget: input }) => {
		const account = { ...this.state.account };
		account[input.name] = input.value;
		this.setState({ account });
	};

	render() {
		const { account } = this.state;

		return (
			<div className='container'>
				<h1>Login</h1>

				<form onSubmit={this.formSubmitHandler}>
					<FormInput
						type='text'
						name='username'
						label='Username'
						errors={{}}
						value={account.username}
						onChangeHandler={this.onChangeHandler}
					/>

					<FormInput
						type='password'
						name='password'
						label='Password'
						errors={{}}
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
