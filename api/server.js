const express = require('express')
const http = require('http')
const fs = require('fs')
const app = express()
const port = process.env.PORT || 1000
const bodyParser = require('body-parser')
const routes = require('./settings/routes.js') 
var cors = require('cors')
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/img', express.static(__dirname + '/img'));

routes(app)

app.use(function (req, res, next) {
	 res.set({
	        'Content-Type': 'text/plain',
	        'Access-Control-Allow-Origin': '*'
	    })
   next();
});




app.listen(port, () => {
    console.log(`Серввер запущен  ${port}`);
})