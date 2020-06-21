import React from 'react';

const FormInput = (props) => {
	const { type, name, label, value, onChangeHandler } = props;

	return (
		<div className='form-group'>
			<label htmlFor={name}>{label}</label>

			<input
				type={type}
				id={name}
				name={name}
				className='form-control'
				value={value}
				onChange={onChangeHandler}
			></input>

			{/* <small className='form-text'>
      <p className='text-danger'>some validation error message</p>
    </small> */}
		</div>
	);
};

export default FormInput;
