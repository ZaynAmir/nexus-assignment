import { useEffect, useState } from 'react';
import useAuth from "./useAuth";
import useAxiosPrivate from "./usePrivate";
import Web3 from 'web3';

export default function useUser() {
    const { isLoggedIn, setUser } = useAuth();
    const axiosPrivateInstance = useAxiosPrivate();
    const [balance, setBalance] = useState(null);
    const [user, setLocalUser] = useState(null); // Local state to hold user data

    async function getUser() {
        if (!isLoggedIn) {
            return;
        }

        try {
            const { data } = await axiosPrivateInstance.get('auth/user');
            setUser(data);
            setLocalUser(data); // Update local state with user data

            // Fetch Ethereum balance using Web3
            const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');
            const walletBalance = await web3.eth.getBalance(data.wallet_address);
            const balanceInEth = web3.utils.fromWei(walletBalance, 'ether');
            setBalance(balanceInEth);
        } catch (error) {
            console.log("Error fetching user data:", error.response);
        }
    }

    useEffect(() => {
        getUser();
    }, [getUser, isLoggedIn, setUser, axiosPrivateInstance]);

    // Return an object with getUser function and other necessary values
    return { getUser, user, balance };
}
