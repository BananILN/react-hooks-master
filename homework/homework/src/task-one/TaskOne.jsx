import React, { useState } from 'react';
import './TaskOne.css';

function useForm(initialValues, onSubmit) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const validate = (fieldName, value) => {
        let error = '';
        switch (fieldName) {
            case 'firstName':
            case 'lastName':
                if (!value.trim()) {
                    error = 'This field is required';
                }
                break;
            case 'email':
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(value)) {
                    error = 'Invalid email address';
                }
                break;
            case 'password':
                if (value.length < 5) {
                    error = 'Password must be at least 5 characters long';
                } else if (!/[0-9]/.test(value) || !/[!@#$%^&*]/.test(value)) {
                    error = 'Password must contain at least one number and one special character';
                }
                break;
            case 'confirmPassword':
                if (value !== values.password) {
                    error = 'Passwords do not match';
                }
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
        setErrors({
            ...errors,
            [name]: validate(name, value),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = {};
        Object.keys(values).forEach((key) => {
            const error = validate(key, values[key]);
            if (error) {
                formErrors[key] = error;
            }
        });
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            onSubmit(values);
        }
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
    };
}

function TaskOne() {
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const onSubmitHandle = (values) => {
        alert(JSON.stringify(values, null, 2));
        // Здесь можно добавить логику отправки данных на сервер
    };

    const { values, errors, handleChange, handleSubmit } = useForm(initialValues, onSubmitHandle);

    return (
        <div className="form-container">
            <div className="error-message">
                {Object.values(errors).map((error, index) => (
                    <div key={index}>{error}</div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="form-input"
                    onChange={handleChange}
                    value={values.firstName}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="form-input"
                    onChange={handleChange}
                    value={values.lastName}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-input"
                    onChange={handleChange}
                    value={values.email}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-input"
                    onChange={handleChange}
                    value={values.password}
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="form-input"
                    onChange={handleChange}
                    value={values.confirmPassword}
                />
                <button type="submit" className="form-button">Register</button>
            </form>
        </div>
    );
}

export default TaskOne;