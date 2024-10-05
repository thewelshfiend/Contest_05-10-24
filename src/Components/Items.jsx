import React from 'react'

const Item = ({ stock }) => {
    function punctuate(num)
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

        num = String(num);

        if (num.includes('.'))
        {
            num = num.split('.');

            return (helper(num[0]) + '.' + num[1]);
        }

        return helper(num);
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