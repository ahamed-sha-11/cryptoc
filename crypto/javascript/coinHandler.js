let cname = "";
let price = "";
let gain = "";
let limg = "";
let desc = "";
let diff = "";
let mcap = ""


async function getCoin(coin) {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Extracting relevant data
        const cname = data.name;
        const limg = data.image.large;
        const price = data.market_data.current_price.usd;
        let desc = data.description.en.trim().split("\n")[0];
        const diff = data.market_data.price_change_24h;
        const gain = data.market_data.price_change_percentage_24h;
        const mcap = data.market_data.market_cap.usd;
        
        console.log(gain);
        
        // Return the extracted data as a JSON object
        return JSON.stringify({ cname, limg, price, desc, diff, gain, mcap });
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        // Optionally handle the error or return an error object
        return JSON.stringify({ error: error.message });
    }
}

export default getCoin;