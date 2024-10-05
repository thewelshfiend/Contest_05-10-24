import React from 'react'

const Item = ({ stock }) => {
    function punctuate(n1)
    {
        function helper(x) 
        {
            x = x.split('').reverse();
            let s = '', count = 1;
            for (let i in x)
            {
                s += x[i];
                if (count % 3 == 0 && i != x.length - 1)
                {
                    s += ',';
                }

                count++;
            }
            return s.split('').reverse().join('');
        }

        n1 = String(n1);

        if (n1.includes('.'))
        {
            n1 = n1.split('.');
            const n2 = n1[0];

            return (helper(n2) + '.' + n1[1]);
        }

        return helper(n1);
    }

    return (
        <tr>
            <td className='nameD'><img src={stock.image} /><span>{stock.name}</span></td>
            <td className='symbol'>{stock.symbol.toUpperCase()}</td>
            <td className='price'>${punctuate(stock.current_price)}</td>
            <td className='volume'>${punctuate(stock.total_volume)}</td>
            <td className={stock.price_change_percentage_24h < 0 ? 'red' : 'green'}>{stock.price_change_percentage_24h.toFixed(2)}%</td>
            <td className='mkt'>Mkt Cap : ${punctuate(stock.market_cap)}</td>
        </tr>
    )
}

export default Item