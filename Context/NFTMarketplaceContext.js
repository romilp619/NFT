import React, { useState, useEffect, useContext } from 'react'
import Web3Modal from 'web3modal';
import { ethers } from "ethers";
import { useRouter } from 'next/router';
import axios from "axios";
import { create as ipfsHttpClient } from 'ipfs-http-client'
// const dotenv = require("dotenv");
// const fs = require('fs');

// dotenv.config({path: "../config.env"});

// const client = ipfsHttpClient("https://ipfs.infura.io:5001");
const projectId = "2HOJiGDa1CaqLJEHkNgqe9smzxy";
// const projectId = "2IafyEBTUMVa5hfpgMow58XtQFA";//Vaibhav HAHA

const projectSecretKey = "ef137d8ad1be6f6808d745feb6b32249";
// const projectSecretKey = "d516b881a6c7e35ce08abf3071869edb";//Vaibhav
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
    "base64"
)}`;
console.log(auth)

const subDomain = "https://tecblic-nft-marketplace.infura-ipfs.io";
// const subDomain = "process.env.SUB_DOMAIN";
// const subDomain = "https://vaibhav-haha.infura-ipfs.io";

const client = ipfsHttpClient({
    host: "infura-ipfs.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: auth,

    },

});



//IImport
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./context"
import { TransferFundsAddress, TransferFundsAbi } from './context';


const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
        NFTMarketplaceAddress,
        NFTMarketplaceABI,
        signerOrProvider
    );


const connectingWithSC = async () => {
    try {

        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        // console.log("provider",provider)
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        // console.log(contract)
        return contract;

    } catch (error) {
        console.log("Something went wrong while connecting with contract", error)
    }
};

//Transfer Funds

const fetchTransferFundsContract = (signerOrProvider) =>
    new ethers.Contract(
        TransferFundsAddress,
        TransferFundsAbi,
        signerOrProvider
    );
// console.log("fetchContract")
// Connecting with SC

const connectToTransferFunds = async () => {
    try {

        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        // console.log("provider",provider)
        const signer = provider.getSigner();
        const contract = fetchTransferFundsContract(signer);
        // console.log(contract)
        return contract;

    } catch (error) {
        console.log("Something went wrong while connecting with contract", error)
    }
};




export const NFTMarketplaceContext = React.createContext();
export const NFTMarketplaceProvider = (({ children }) => {
    const titleData = "Discover, Collect and sell NFTs";
    // const checkContract = async() => {
    //     const contract = await connectingWithSC()
    //     // console.log("Contract Info",contract)
    // }
    const [error, setError] = useState("");


    const [openError, setOpenError] = useState(false);
    const [currentAccount, setCurrentAccount] = useState("");//checks the user is connected or not
    const [accountBalance, setAccountBalance] = useState('')
    const router = useRouter();

    //CHECK IF WALLET IS CONNECTED
    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum)
                return setOpenError(true), setError("Install Metamask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts"
            });

            if (accounts.length) {
                setCurrentAccount(accounts[0])
            } else {
                setError("No Account found");
                setOpenError(true)
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const getBalance = await provider.getBalance(accounts[0]);
            const bal = ethers.utils.formatEther(getBalance);
            setAccountBalance(bal);
        } catch (error) {
            setError("Something went wrong while connecting to wallet");
            setOpenError(true)
        }
    }

    useEffect(() => {
        checkIfWalletConnected();
        connectingWithSC();
    }, []);

    //Wallet Function

    const connectWallet = async () => {
        try {
            if (!window.ethereum)
                return setOpenError(true), setError("Install MetaMask");

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            setCurrentAccount(accounts[0]);
            //window.location.reload();


        } catch {
            setError("Error while connecting to wallet");
            setOpenError(true);

        }
    };

    //UPLOAD TO IPFS
    const uploadToIPFS = async (file) => {
        try {
            // console.log("test1")
            const added = await client.add({ content: file });

            // const url = `${subDomain}/ipfs/${added.path}`;
            const url = `${subDomain}/ipfs/${added.path}`;
            console.log(url)
            return url;
        } catch (error) {
            setError("Error Uploading to IPFS");
            setOpenError(true);
            console.log(error)

        }
    }

    // CREATE NFT FUNCTION
    const createNFT = async (name,
        price,
        image,
        description,
        router,) => {

        // const { name, description, price } = formInput;
        if (!name || !description || !price || !image)
            return setError("Data is Missing"), setOpenError(true);

        const data = JSON.stringify({ name, description, image })

        try {
            const added = await client.add(data);
            const url = `${subDomain}/ipfs/${added.path}`
            await createSale(url, price)
            router.push('/searchPage')
        } catch (error) {
            setError("Error while creating NFT");
            setOpenError(true);
        }

        //console.log("Error while creating NFT");


    }

    //CREATE SALE FUNCTION

    const createSale = async (url, formInputPrice, isReselling, id) => {
        try {
            const price = ethers.utils.parseUnits(formInputPrice, "ether");
            const contract = await connectingWithSC();

            const listingPrice = await contract.getListingPrice();
            // const transaction = ! isReselling ? await contract.createToken(url, price)
            const transaction = !isReselling ? await contract.createToken(url, price, {
                value: listingPrice.toString(),
            }) :

                await contract.resellToken(id, price, {
                    value: listingPrice.toString(),

                });

            await transaction.wait();
            // console.log(transaction);


        } catch (error) {
            setError("error while creating sale");
            setOpenError(true);
            // console.log(error);
        }
    }

    //Fetch NFTs

    const fetchNFTs = async () => {
        try {
            if (currentAccount) {
                const provider = new ethers.providers.JsonRpcProvider(
                    "https://polygon-mumbai.g.alchemy.com/v2/1lES1JZ5hsBKn8i9gDRMrj8CRJdMfohy"
                );
                const contract = fetchContract(provider);

                const data = await contract.fetchMarketItems()

                console.log("Fetch Market Item ", data);

                const items = await Promise.all(
                    data?.map(async ({ tokenId, seller, owner, price: unFormattedPrice }) => {
                        const tokenURI = await contract.tokenURI(tokenId);
                        console.log(tokenURI)
                        const {
                            data: { image, name, description },
                        } = await axios.get(tokenURI);
                        console.log("data", data)
                        const price = ethers.utils.formatUnits(
                            unFormattedPrice.toString(),
                            "ether"
                        );
                        console.log("price")
                        return {
                            price,
                            tokenId: tokenId.toNumber(),
                            seller,
                            owner,
                            image,
                            name,
                            description,
                            tokenURI,
                        };

                    })


                );
                console.log("items", items)
                return items;
            }
        } catch (error) {
            setError("Error while fetching NFTS");
            setOpenError(true);
            // console.log(error);
        }
    };

    useEffect(() => {
        if (currentAccount) {
            fetchNFTs();
        }

    }, [])

    //Fetch My NFT or listed NFTs

    const fetchMyNFTsOrListedNFTs = async (type) => {
        try {
            if (currentAccount) {
                const contract = await connectingWithSC();

                const data =
                    type == "fetchItemsListed"
                        ? await contract.fetchItemsListed()
                        : await contract.fetchMyNFTs();
                console.log("data")
                const items = await Promise.all(
                    data.map(
                        async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                            const tokenURI = await contract.tokenURI(tokenId);
                            const {
                                data: { image, name, description },
                            } = await axios.get(tokenURI);
                            const price = ethers.utils.formatUnits(
                                unformattedPrice.toString(),
                                "ether"
                            );

                            return {
                                price,
                                tokenId: tokenId.toNumber(),
                                seller,
                                owner,
                                image,
                                name,
                                description,
                                tokenURI,
                            };
                        }
                    )
                );
                return items;
            }
        } catch (error) {
            console.log("Error while fetching listed NFTs", error);
            setOpenError(true);
        }
    };

    useEffect(() => {
        fetchMyNFTsOrListedNFTs();
    }, []);


    //BUY NFTS

    const buyNFT = async (nft) => {
        try {

            const contract = await connectingWithSC();
            const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
            const transaction = await contract.createMarketSale(nft.tokenId, {
                value: price,
            });

            await transaction.wait()
            router.push("/author")

        } catch (error) {
            setError("Error While buying NFT");
            setOpenError(true);
        }
    }

    //TRANSFER FUNDS
    const [transactionCount, setTransactionCount] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

    const transferEther = async (address, ether, message) => {
        try {
            if (currentAccount) {
                const contract = await connectToTransferFunds();
                console.log(address, ether, message);

                const unFormatedPrice = ethers.utils.parseEther(ether);
                // //FIRST METHOD TO TRANSFER FUND
                await ethereum.request({
                    method: "eth_sendTransaction",
                    params: [
                        {
                            from: currentAccount,
                            to: address,
                            gas: "0x5208",
                            value: unFormatedPrice._hex,
                        },
                    ],
                });

                const transaction = await contract.addDataToBlockchain(
                    address,
                    unFormatedPrice,
                    message
                );

                console.log(transaction);

                setLoading(true);
                transaction.wait();
                setLoading(false);

                const transactionCount = await contract.getTransactionCount();
                setTransactionCount(transactionCount.toNumber());
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };

    //FETCH ALL TRANSACTION
    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const contract = await connectToTransferFunds();

                const avaliableTransaction = await contract.getAllTransactions();
                console.log("testing.......")
                const readTransaction = avaliableTransaction.map((transaction) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(
                        transaction.timestamp.toNumber() * 1000
                    ).toLocaleString(),
                    message: transaction.message,
                    amount: parseInt(transaction.amount._hex) / 10 ** 18,
                }));

                setTransactions(readTransaction);
                console.log(transactions);
            } else {
                console.log("On Ethereum");
            }
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <NFTMarketplaceContext.Provider value={{
            // checkContract,
            checkIfWalletConnected,
            connectWallet,
            uploadToIPFS,
            createNFT,
            fetchNFTs,
            fetchMyNFTsOrListedNFTs,
            buyNFT,
            createSale,
            currentAccount,
            titleData,
            setError,
            setOpenError,
            error,
            openError,
            transferEther,
            getAllTransactions,
            loading,
            accountBalance,
            transactionCount,
            transactions,
        }}>
            {children}
        </NFTMarketplaceContext.Provider>
    )
})



