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
import ProtectedRoute from './components/reusable/ProtectedRoute';

class App extends Component {
	state = {}

	componentDidMount() {
		const user = getCurrentUser();
		this.setState({ user });
	}

	render() {
		const user = this.state.user;

		return (
			<>
				<NavBar user={ user } />

				<main className='container'>
					<Switch>
						<Route path='/register' component={ RegisterForm } />
						<Route path='/login' component={ LoginForm } />
						<Route path='/logout' component={ Logout } />
						<ProtectedRoute path='/movies/:id' component={ MoviesForm } />
						<Route path='/movies' render={ (props) => <Movies { ...props } user={ user } /> } />
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
