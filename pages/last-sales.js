import React, { useEffect , useState } from 'react'
import useSWR from 'swr'

const LastSalesPage = () => {
     const [sales, setSales] = useState('')
    // const [isLoading, setisLoading] = useState(false)
   
    const { data, error } =  useSWR('https://nextjs-c5196-default-rtdb.firebaseio.com/sales.json');
   
   useEffect(() => {
    if(data) {
          const transfromedSales = []

           for(const key in data) {
               transfromedSales.push({
                   id: key, 
                   username : data[key].username,
                   volume : data[key].volume
               })
           } 
           setSales(transfromedSales)
    }
   
   }, [data])


    // useEffect(() => {
    //     setisLoading(true)
    //    fetch('https://nextjs-c5196-default-rtdb.firebaseio.com/sales.json').then(res => res.json())
    //    .then(data => {
    //        const transfromedSales = []

    //        for(const key in data) {
    //            transfromedSales.push({
    //                id: key, 
    //                username : data[key].username,
    //                volume : data[key].volume
    //            })
    //        }

    //        setSales(transfromedSales);
    //        setisLoading(false);
    //    })
    // }, [])

    if(error) {
        return <p>Failed to load .</p>
    }

    if(!data || !sales) {
        return <p>Loading ... </p>
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
