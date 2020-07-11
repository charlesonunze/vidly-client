import { Component } from 'react';
import { logoutUser } from '../services/authService';

class Logout extends Component {
	async componentDidMount() {
		await logoutUser();
		window.location = '/movies';
	}

	render() {
		return null;
	}
}

export default Logout;
