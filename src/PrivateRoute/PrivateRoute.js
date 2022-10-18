import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../context/UserContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div>
                <button>Loading</button>
            </div>
        )
    }
    if (user?.uid) {
        return children;
    } else {
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }


};

export default PrivateRoute;