let cname = "";
let price = "";
let gain = "";
let limg = "";
let gainc = "";
let mcap = "";

let blockchain_platforms = ["ethereum", "bitcoin", "cardano","internet-computer","polkadot",'eos'];

async function getcoin(coin) {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    cname = data.name;
    limg = data.image.small;
    price = data.market_data.current_price.usd;
    gain = data.market_data.price_change_percentage_24h;
    mcap = data.market_data.market_cap.usd;
    gain = parseFloat(gain).toFixed(2);
    gainc = (gain <= 0) ? "red" : "green";
    
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="${limg}" alt="${cname}"></td>
      <td><a href="https://www.coingecko.com/en/coins/${cname.toLowerCase()}">${cname}</a></td>
      <td>$ ${price}</td>
      <td style="color: ${gainc};">${gain} %</td>
      <td>$${mcap}</td>
    `;
    tr.classList.add('dynamic-children');
    const table = document.querySelector("#coins");
    table.appendChild(tr);
  } 
  catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

async function getcoinWithDelay(coin, delay) {
  await getcoin(coin);
  await new Promise(resolve => setTimeout(resolve, delay));
}

async function fetchCoins() {
  for (let index = 0; index < blockchain_platforms.length; index++) {
    await getcoinWithDelay(blockchain_platforms[index], index*3000);
  }
}

fetchCoins();

const sbox = document.querySelector('#scoin');
const sbtn = document.querySelector('button');
const rbtn = document.querySelector('#refresh');

sbtn.addEventListener('click', ()=>
{
  blockchain_platforms = []
  const refresh = document.querySelectorAll('.dynamic-children');
  refresh.forEach((ele)=>
  {
    ele.remove();
  })
  if(sbox.value =="" || sbox.value ==" ") 
  { 
    let blockchain_platforms = ["ethereum", "bitcoin", "cardano","internet-computer","polkadot",'Eos'];
    fetchCoins();
  }
  getcoin(sbox.value);
});
rbtn.addEventListener('click', ()=>
{

    let blockchain_platforms = ["ethereum", "bitcoin", "cardano","internet-computer","polkadot",'eos'];
    fetchCoins();

});