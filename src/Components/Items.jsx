import React from 'react'

const Item = ({stock}) => {
    return (
        <tr>
            <td className='nameD'><img src={stock.image} /><span>{stock.name}</span></td>
            <td className='symbol'>{stock.symbol.toUpperCase()}</td>
            <td className='price'>${stock.current_price}</td>
            <td className='volume'>${stock.total_volume}</td>
            <td className={stock.price_change_percentage_24h < 0 ? 'red' : 'green'}>{stock.price_change_percentage_24h.toFixed(2)}%</td>
            <td className='mkt'>Mkt Cap : ${stock.market_cap}</td>
        </tr>
    )
}

export default Item