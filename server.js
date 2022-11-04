const express = require('express');
const cors = require('cors');
const axios = require('axios');


const app = express()

app.use(cors());



const PORT = process.env.PORT || 3002;

app.get('/allcoin',async(req,res)=>{
    console.log(req.query.vs_currency)
    let parsedCurrency = req.query.vs_currency;
    const options = {
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/coins/markets',
        params: {vs_currency: parsedCurrency, page: '1', per_page: '100', order: 'market_cap_desc'},
        headers: {
          'accept': 'application/json',
        }
      };
      
       const {data} = await axios.request(options);
       res.json(data)
      //  console.log(data)
      //  console.log('me')
       
})


app.get('/trendlist',async(req,res)=>{
    const parsedCurrency = req.query.vs_currency;
    const options = {
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/coins/markets',
        params: {
          vs_currency: parsedCurrency,
          price_change_percentage: '24',
          page: '1',
          sparkline: 'false',
          per_page: '10',
          order: 'geckodesc'
        },
        headers: {
          'accept': 'application/json',
        }
      };
      
      
      
       
       const {data} = await axios.request(options);
       res.json(data)
       
      
});


app.get('/singlecoin/:id',async(req,res)=>{
    const {id} = req.params;
    const options = {
        method: 'GET',
        url: `https://api.coingecko.com/api/v3/coins/${id}`,
        
        headers: {
          'accept': 'application/json',
          
        }
      };
            
       const {data} = await axios.request(options);
       res.json(data)
          
});


app.get('/historicchart/:id',async(req,res)=>{
  const {id} = req.params;
    const parsedDays = req.query.days;
    const parsedCurrency = req.query.vs_currency
    const options = {
        method: 'GET',
        url: `https://coingecko.p.rapidapi.com/coins/${id}/market_chart`,
        params: {vs_currency: parsedCurrency, days:parsedDays},
        headers: {
          'X-RapidAPI-Key': '7c5e697bcamsh67b9d2a73035814p146b5fjsn82d8af536696',
          'X-RapidAPI-Host': 'coingecko.p.rapidapi.com'
        }
      };
      const {data} = await axios.request(options);
       res.json(data)
           
})


app.listen(PORT, ()=>{
    console.log(`Server is listening at port ${PORT}`)
})