
const API = {
    fetchSeriesData: () => {
        return new Promise((resolve, reject) => {
            fetch('https://www.binance.com/api/v1/klines?symbol=BTCUSDT&interval=1m')
            .then(async res => {
                const data = await res.json();
                const result = data.map(([time, open, high, low, close]) => close);
                resolve(result);
                // return result;
            })
            .catch(e => reject(e));
        });
    },
    subscribe(success) {
        try {
            const socket = new WebSocket('wss://stream.binance.com/stream?streams=btcusdt@kline_1m');
            socket.onmessage = e => {
                const res = JSON.parse(e.data);
                const { t, o, h, l, c } = res.data.k;
                success([t, o, h, l, c]);
            }
        } catch(e) {
            console.error(e.message);
        }
    }
}

export default API;