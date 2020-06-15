import React from 'react';

const Like = (props) => {
	let classes = props.liked ? 'fa fa-heart' : 'fa fa-heart-o';

	return (
		<button className='btn btn-sm' onClick={props.handleLike}>
			<span>
				<i className={classes}></i>
			</span>
		</button>
	);
};

export default Like;
