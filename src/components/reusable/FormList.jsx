import React from 'react';

const FormList = (props) => {
	const { name, label, error, value, options, onChangeHandler } = props;

	return (
		<div className='form-group'>
			<label htmlFor={name}>{label}</label>

			<select
				className='form-control'
				id={name}
				name={name}
				onChange={onChangeHandler}
			>
				<option value='' />
				{options.map((option, index) => {
					return (
						<option
							value={option.value}
							key={index}
							selected={option.value === value}
						>
							{option.name}
						</option>
					);
				})}
			</select>

			{error && (
				<small className='form-text'>
					<p className='text-danger'>{error}</p>
				</small>
			)}
		</div>
	);
};

export default FormList;
