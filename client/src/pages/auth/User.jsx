import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useLogout from '../../hooks/useLogout';
import useUser from '../../hooks/useUser';

export default function User() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const logout = useLogout();
    const [loading, setLoading] = useState(false);
    const { fetchUserAndBalance, balance } = useUser(); // Destructure fetchUserAndBalance and balance from useUser

    useEffect(() => {
        fetchUserAndBalance(); // Fetch user data and balance on component mount
    }, [fetchUserAndBalance]); // Dependency array ensures this effect runs only when fetchUserAndBalance changes

    async function onLogout() {
        setLoading(true);
        await logout();
        navigate('/');
    }

    return (
        <div className='container mt-3'>
            <h4>User Details:</h4>
            <div>
                <strong>ID:</strong> {user?.id}<br />
                <strong>Username:</strong> {user?.username}<br />
                <strong>Email:</strong> {user?.email}<br />
                <strong>First Name:</strong> {user?.first_name}<br />
                <strong>Last Name:</strong> {user?.last_name}<br />
                <strong>Is Staff:</strong> {user?.is_staff ? 'Yes' : 'No'}<br />
                <strong>Ethereum Wallet Balance:</strong> {balance !== null ? `${balance} ETH` : 'Loading...'}<br />
            </div>
            <button disabled={loading} type='button' onClick={onLogout}>
                Logout
            </button>
        </div>
    );
}
