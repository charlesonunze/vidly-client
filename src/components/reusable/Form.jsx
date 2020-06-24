import React, { Component } from 'react';
import Joi from 'joi-browser';
import FormInput from '../FormInput';

class Form extends Component {
	state = {
		data: {},
		errors: {}
	};

	validateInput = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.data, this.schema, options);

		if (!error) return null;

		const errors = {};
		for (let details of error.details) {
			errors[details.path[0]] = details.message;
		}
		return errors;
	};

	onChangeHandler = ({ currentTarget: input }) => {
		const data = { ...this.state.data };
		data[input.name] = input.value;
		this.setState({ data });
	};

	formSubmitHandler = (e) => {
		e.preventDefault();

		const errors = this.validateInput();
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.submitForm();
	};

	renderFormInput(type, name, label) {
		const { data, errors } = this.state;

		return (
			<FormInput
				type={type}
				name={name}
				label={label}
				error={errors[name]}
				value={data[name]}
				onChangeHandler={this.onChangeHandler}
			/>
		);
	}

	renderSubmitButton(label) {
		return (
			<button
				type='submit'
				className='btn btn-primary'
				disabled={this.validateInput()}
			>
				{label}
			</button>
		);
	}
}

export default Form;
