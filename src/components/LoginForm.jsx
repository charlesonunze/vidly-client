import React, { Component } from 'react';

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
					<div className='form-group'>
						<label htmlFor='username'>Username</label>

						<input
							type='text'
							id='username'
							name='username'
							className='form-control'
							value={account.username}
							onChange={this.onChangeHandler}
						></input>

						{/* <small className='form-text'>
							<p className='text-danger'>some validation error message</p>
						</small> */}
					</div>

					<div className='form-group'>
						<label htmlFor='password'>Password</label>

						<input
							type='password'
							id='password'
							name='password'
							className='form-control'
							value={account.password}
							onChange={this.onChangeHandler}
						></input>
					</div>

					<button type='submit' className='btn btn-primary'>
						Submit
					</button>
				</form>
			</div>
		);
	}
}

export default LoginForm;
