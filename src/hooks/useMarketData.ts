import useSWR from 'swr';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';
const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useMarketData() {
  const { data: cryptoData, error: cryptoError } = useSWR(
    `${COINGECKO_API}/simple/price?ids=bitcoin,ethereum,binancecoin&vs_currencies=usd&include_24hr_change=true`,
    fetcher,
    { refreshInterval: 30000 }
  );

  const { data: stockData, error: stockError } = useSWR(
    'https://finnhub.io/api/v1/quote?symbol=AAPL&token=demo',
    fetcher,
    { refreshInterval: 30000 }
  );

  return {
    cryptoData,
    stockData,
    isLoading: !cryptoData && !cryptoError,
    isError: cryptoError || stockError,
  };
}