const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const path =  require('path')
const port = process.env.PORT || 8080;

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

//----------------------------------------CORS HANDELING USING HEADERS--------------------------
// app.all(bodyParser.urlencoded({extended:false}));
// app.all();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Origin , Accept , Authorization , X-Requested-With'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})

//----------------------------------------------------------------------------------------------
app.use(express.static('build'));
app.use(express.json());


app.get('/backend',async (req,res)=>{
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test');
      const results = { 'results': (result) ? result.rows : null};
      res.json(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.json( {
          Error:err.message
      });
    }
})

app.post('/backend/register',(req,res)=>{
    console.log(req.body);
    res.json(req.body);
})


app.get('*', (req,res) =>{
    res.sendFile((__dirname + '/build/index.html'));
});


app.listen(port ,()=>{
    console.log("server is running on port number " + port);
})