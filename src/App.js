import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Movies from './components/Movies';
import NavBar from './components/NavBar';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import NotFound from './components/NotFound';
import MoviesForm from './components/MoviesForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Logout from './components/Logout';
import { getCurrentUser } from './services/authService';

class App extends Component {
	state = {}

	async componentDidMount() {
		const user = await getCurrentUser();
		this.setState({ user });
	}

	render() {
		return (
			<>
				<NavBar user={ this.state.user } />

				<main className='container'>
					<Switch>
						<Route path='/register' component={ RegisterForm } />
						<Route path='/login' component={ LoginForm } />
						<Route path='/logout' component={ Logout } />
						<Route path='/movies/:id' component={ MoviesForm } />
						<Route path='/movies' component={ Movies } />
						<Route path='/rentals' component={ Rentals } />
						<Route path='/customers' component={ Customers } />
						<Route path='/not-found' component={ NotFound } />
						<Redirect from='/' exact to='/movies' />
						<Redirect to='/not-found' />
					</Switch>
				</main>
			</>
		);
	}
}

export default App;
