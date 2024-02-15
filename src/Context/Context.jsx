import React, { createContext, useContext, useState, useEffect } from "react";

const ApiContext = createContext();

export function Contexts({ children }) {
    const [filteredData, setFilteredData] = useState([]);
    const [data, setData] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setusername] = useState("");
    const [val, setval] = useState(0);
    const [numsco, setnumso] = useState(0);

    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(newsData => {
                setData(newsData['products'])
            })
            .catch(error => {
                console.error('Error:', error);
            });

    }, [])

    const [sharedData, setSharedData] = useState(' ');
    const [searchQuery, setSearchQuery] = useState('');

    const updateSharedData = (newData) => {
        setSharedData(typeof newData);
    };

    return (
        <ApiContext.Provider value={{ val ,numsco,setnumso, setval,data, sharedData, updateSharedData, searchQuery, setSearchQuery ,password,setPassword,setEmail,email,username ,setusername }}>
            {children}
        </ApiContext.Provider>
    );

}

export function useApi() {
    return useContext(ApiContext);
}