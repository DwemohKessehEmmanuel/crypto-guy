const express = require('express');
const cors = require('cors');
const axios = require('axios');
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express');

const app = express()


app.use(cors());



const PORT = process.env.PORT || 3002;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      description: "",
      version: "3.0.0",
      title: "CoinGecko API V3"
    }
  
  },
  apis: ['server.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs',swaggerUI.serve, swaggerUI.setup(swaggerDocs) );


/**
 * @swagger
 * /allcoin:
 *    get:
 *      description: List all supported coins price, market cap, volume, and market related data
 *      responses:
 *        200: 
 *          description: List all coins with market data
 * 
 */
 app.get('/allcoin',async(req,res)=>{
  console.log(req.query.vs_currency)
  let parsedCurrency = req.query.vs_currency;
  const options = {
      method: 'GET',
      url: 'https://api.coingecko.com/api/v3/coins/markets',
      params: {vs_currency: req.query.vs_currency? parsedCurrency:'usd', page: '1', per_page: '100', order: 'market_cap_desc'},
      headers: {
         'accept': 'application/json'
      }
    };
    
     const {data} = await axios.request(options).catch(error=>{
      console.log(error)
     });
     res.json(data)
    //  console.log(data)
    //  console.log('me')
     
})

/**
 * @swagger
 * /trendlist:
 *    get: 
 *      description: Provides a list of top 10 trending coins according to price change in 24 hours
 *      responses: 
 *        200:
 *          description: List coins with market data per price change in 24 hours
 */
 app.get('/trendlist',async(req,res)=>{
  const parsedCurrency = req.query.vs_currency;
  const options = {
      method: 'GET',
      url: 'https://api.coingecko.com/api/v3/coins/markets',
      params: {
        vs_currency: req.query.vs_currency? parsedCurrency:'usd',
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

/**
 * @swagger
 * /singlecoin{id}:
 *    get:
 *      description: Get current data (name, price, market, ... including exchange tickers) for a coin
 *      parameters:
 *      - name: id
 *        description: id of supported coin
 *        in: formData
 *        required: true
 *        type: string
 *      responses:
 *        200:
 *          description: Get current data for a coin
 */
 app.get('/singlecoin/:id',async(req,res)=>{
  const {id} = req.params;


  const options = {
      method: 'GET',
      url: `https://api.coingecko.com/api/v3/coins/${id?req.params.id:''}`,
      
      headers: {
        'accept': 'application/json',
        
      }
    };
          
     const {data} = await axios.request(options);
     res.json(data)
        
});

/**
 * @swagger
 * historicchart{id}:
 *    get:
 *      description: Get historical market data include price, market cap, and 24h volume (granularity auto) <b><ul><li>Data granularity is automatic (cannot be adjusted)</li><li>1 day from current time = 5 minute interval data</li><li>1 - 90 days from current time = hourly data</li><li>above 90 days from current time = daily data (00:00 UTC)</li></ul> </b>"
 *      responses: 
 *        200:
 *          description: Get historical market data include price, market cap, and 24h volume
 */ 
 app.get('/historicchart/:id',async(req,res)=>{
  const {id} = req.params;
    const parsedDays = req.query.days;
    const parsedCurrency = req.query.vs_currency
    const options = {
        method: 'GET',
        url: `https://api.coingecko.com/api/v3/coins/${id?req.params.id :''}/market_chart`,
        params: {vs_currency:req.query.vs_currency? parsedCurrency:'usd', 
                  days:parsedDays},
        headers: {
          'accept': 'application/json',
        }
      };
      const {data} = await axios.request(options);
       res.json(data)
           
})



app.listen(PORT, ()=>{
    console.log(`Server is listening at port ${PORT}`)
})

