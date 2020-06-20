import React from 'react';
import Movies from './components/Movies';
import NavBar from './components/NavBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import NotFound from './components/NotFound';
import MoviesForm from './components/MoviesForm';

function App() {
	return (
		<>
			<NavBar />
			<main className='container'>
				<Switch>
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
