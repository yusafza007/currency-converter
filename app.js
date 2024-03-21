const express= require('express');
const bodyParser= require('body-parser');
const axios = require('axios');
const ejs = require('ejs')

const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

app.set('view engine' , 'ejs')

app.get("/",(req,res)=>{

    res.render("index",{ result: null,value:null,currencyFrom:null,currencyTo:null })
    
});

app.post("/", (req, res) => {
    const value = req.body.cur1;
    const currencyFrom = req.body.curr1;
    const currencyTo = req.body.curr2;
    const API = "8cbd51dd376338078867429e";
    const url = `https://v6.exchangerate-api.com/v6/${API}/pair/${currencyFrom}/${currencyTo}`;

    axios.get(url)
        .then((response) => {
            const data = response.data;
            const rate = data.conversion_rate;
            const result = Math.round(((value * rate) + Number.EPSILON) * 100) / 100;

            // Redirecting to home route with the result as a query parameter
            res.render("index",{result:result,value:value,currencyFrom:currencyFrom,currencyTo:currencyTo})
        })
        .catch(function (error) {
            console.log(error);
            // Send error response
            res.send("<h1>Unsupported Currency...</h1>");
        });
});



app.listen(3000,()=>{
    console.log("server is running on port 3000");
});