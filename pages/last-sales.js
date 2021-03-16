import React, { useEffect , useState } from 'react'

const LastSalesPage = () => {
    const [sales, setSales] = useState('')
    const [isLoading, setisLoading] = useState(false)
    useEffect(() => {
        setisLoading(true)
       fetch('https://nextjs-c5196-default-rtdb.firebaseio.com/sales.json').then(res => res.json())
       .then(data => {
           const transfromedSales = []

           for(const key in data) {
               transfromedSales.push({
                   id: key, 
                   username : data[key].username,
                   volume : data[key].volume
               })
           }

           setSales(transfromedSales);
           setisLoading(false);
       })
    }, [])

    if(isLoading) {
        return <p>Loading....</p>
    }

    if(!sales) {
        return <p>NoData yet</p>
    }
    return (
        <ul>
            {sales.map(sale => <li key={sale.id}>
                {sale.username} -- ${sale.volume}
            </li>)}
        </ul>
    )
}

export default LastSalesPage
