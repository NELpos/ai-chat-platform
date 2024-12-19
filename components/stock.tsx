interface StockProps {
  symbol: string;
  numOfMonths: number;
}

export async function Stock({ symbol, numOfMonths }: StockProps) {
  const data = await fetch(
    `https://api.example.com/stock/${symbol}/${numOfMonths}`
  );

  return (
    <div>
      <div>AAPL</div>

      <div>
        "$11.11"
        {/* {data.timeline.map(data => (
            <div>
              <div>{data.date}</div>
              <div>{data.value}</div>
            </div>
          ))} */}
      </div>
    </div>
  );
}
