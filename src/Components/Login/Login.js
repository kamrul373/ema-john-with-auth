import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import "./Login.css"
const Login = () => {
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    // form event hanlder
    const handleSubmit = (e) => {
        e.preventDefault();
        // getting form value
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
            .then(result => {
                const user = result.user;
                navigate(from, { replace: true });
                console.log(user);
            }).catch(error => setError(error.message))
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
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
                <div className="submit-btn-container">
                    <button>Login</button>
                </div>
                <div id='new-to'>
                    <p>New to Ema-john? <Link to="/register">Create New Account</Link> </p>
                </div>
            </form>
        </div>
    );
};

export default Login;