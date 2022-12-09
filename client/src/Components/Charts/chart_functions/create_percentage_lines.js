

export default function create_percentage_lines(Data){
    const initialData = Data[0]

    return  (
        Data.map((i)=>{
            const eth_change = ((i["lowest_floor_price_eth"] - initialData["lowest_floor_price_eth"]) / initialData["lowest_floor_price_eth"]) * 100
            const usd_change = ((i["lowest_floor_price_usd"] - initialData["lowest_floor_price_usd"]) / initialData["lowest_floor_price_usd"]) * 100

            return (
                {
                    eth_change : eth_change.toFixed(2),
                    usd_change : usd_change.toFixed(2),
                    timestamp : i.timestamp
                }
            )
        })
    )

}
