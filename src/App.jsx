import React, { useEffect, useState } from 'react'
import './App.css'
import Item from './Components/Items'
import Loader from './Components/Loader';

function App() 
{
    const [stocks, setStocks] = useState([]);
    const [updatedStocks, setUpdatedStocks] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        async function fetchCryptoData() {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
                const data = await response.json();

                Promise.resolve(data)
                    .then(cryptoData => {
                        setStocks(cryptoData);
                        setUpdatedStocks(cryptoData);
                    })
                    .catch(error => console.error('Error processing data:', error));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchCryptoData();
        setStocks([]);
    }, []);

    useEffect(() => {
        setUpdatedStocks(stocks.filter((stock) => {
            return (stock.name.toLowerCase().includes(searchValue.toLowerCase()) || stock.symbol.includes(searchValue.toLowerCase()))
        }))
    }, [searchValue]);

    function sortMktCap() {
        setUpdatedStocks([...updatedStocks].sort((a, b) => (b.market_cap - a.market_cap)));
    }

    function sortPercentage() {
        setUpdatedStocks([...updatedStocks].sort((a, b) => (b.price_change_percentage_24h - a.price_change_percentage_24h)));
    }

    return (
        <div id='app'>
            <header>
                <input type='text' placeholder='Search By Name or Symbol' value={searchValue} onChange={(e) => (setSearchValue(e.target.value))} />
                <button onClick={sortMktCap}>Sort By Mkt Cap</button>
                <button onClick={sortPercentage}>Sort By Percentage</button>
            </header>
            {
                !stocks.length ?
                    <Loader /> :
                    <table>
                        <tbody>
                            {
                                updatedStocks.length && updatedStocks.map((stock) => (
                                    <Item key={stock.id} stock={stock} />
                                ))
                            }
                        </tbody>
                    </table>
            }
        </div>
    )
}

export default App