// import React, { useEffect } from 'react';
// import useUser from '../hooks/useUser';

// export default function Home() {
//     const { getUser, user, balance } = useUser();

//     useEffect(() => {
//         getUser();
//     }, [getUser]); // Add getUser to the dependency array

//     return (
//         <div className='container mt-3'>
//             <h2>
//                 <div className='row'>
//                     <div className="mb-12">
//                         {user?.email !== undefined ? (
//                             <>
//                                 <div>Email: {user.email}</div>
//                                 <div>Ethereum Wallet Balance: {balance ? balance : 5000} ETH</div>
//                             </>
//                         ) : (
//                             'Please login first'
//                         )}
//                     </div>
//                 </div>
//             </h2>
//         </div>
//     );
// }


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
