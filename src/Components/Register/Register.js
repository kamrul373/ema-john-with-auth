import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import styles from "./Register.module.css";

const Register = () => {
    const [error, setError] = useState(null);
    const { createUser } = useContext(AuthContext);

    // form event handler
    const handleSubmit = (e) => {
        e.preventDefault();
        // getting form value
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirm_password.value;

        if (password !== confirmPassword) {
            setError("Password did not match");
            return false;
        }
        if (password.length < 6) {
            setError("Password should contain 6 charecters")
            return false;
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
            }).catch(error => setError(error.message));

        console.log(email, password, confirmPassword)
    }
    return (
        <div className={`${styles.form_container} form-container`}>
            <h2 className='form-title'>Register</h2>
            <h3 style={{ color: "red", textAlign: "center" }}>
                {
                    error && error
                }
            </h3>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id='email' />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='password' />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input type="password" name='confirm_password' id='confirm_password' />
                </div>
                <div className="submit-btn-container">
                    <button>Register</button>
                </div>
                <div id='new-to'>
                    <p>Already have an account?  <Link to="/login">Login</Link> </p>
                </div>
            </form>
        </div>
    );
};

export default Register;