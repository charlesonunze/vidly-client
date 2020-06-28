import React from 'react';

const FormInput = (props) => {
	const {
		type,
		name,
		label,
		value,
		placeholder,
		error,
		onChangeHandler
	} = props;

	return (
		<div className='form-group'>
			<label htmlFor={name}>{label}</label>

			<input
				type={type}
				id={name}
				name={name}
				className='form-control'
				value={value}
				placeholder={placeholder}
				onChange={onChangeHandler}
			></input>

			{error && (
				<small className='form-text'>
					<p className='text-danger'>{error}</p>
				</small>
			)}
		</div>
	);
};

export default FormInput;
