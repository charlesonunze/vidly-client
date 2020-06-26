import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Movies from './components/Movies';
import NavBar from './components/NavBar';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import NotFound from './components/NotFound';
import MoviesForm from './components/MoviesForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

function App() {
	return (
		<>
			<NavBar />
			<main className='container'>
				<Switch>
					<Route path='/register' component={ RegisterForm } />
					<Route path='/login' component={ LoginForm } />
					<Route path='/movies/new' exact component={ MoviesForm } />
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

export default App;
