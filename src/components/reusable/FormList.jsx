import React from 'react';

const FormList = (props) => {
	const { name, label, data, onChangeHandler } = props;

	return (
		<div className='form-group'>
			<label htmlFor={name}>{label}</label>

			<select
				className='form-control'
				id={name}
				name={name}
				onChange={onChangeHandler}
			>
				{data.map((value, index) => {
					return (
						<option value={value} key={index}>
							{value}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default FormList;
