import React from 'react';

const MoviesForm = ({ match, history }) => {
	return (
		<div>
			<h1>MovieForm {match.params.id} </h1>
			<button className='btn btn-primary' onClick={() => history.replace('/')}>
				Save
			</button>
		</div>
	);
};

export default MoviesForm;
