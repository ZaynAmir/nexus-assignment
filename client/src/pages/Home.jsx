

import React, { useEffect } from 'react';
import useUser from '../hooks/useUser';

export default function Home() {
    const { fetchUserAndBalance, user, balance } = useUser();

    useEffect(() => {
        fetchUserAndBalance();
    }, [fetchUserAndBalance]);

    return (
        <div className='container mt-3'>
            <h2>
                <div className='row'>
                    <div className="mb-12">
                        {user?.email ? (
                            <>
                                <div>Email: {user.email}</div>
                                <div>Ethereum Wallet Balance: {balance ? balance : 'Loading...'} ETH</div>
                            </>
                        ) : (
                            'Please login first'
                        )}
                    </div>
                </div>
            </h2>
        </div>
    );
}
